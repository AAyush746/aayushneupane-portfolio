"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { squareRoutes } from "@/data/navigation";

/* ------------------------------------------------------------------ */
/* Board geometry — files a..h left→right, ranks 1..8 near→far camera  */
/* ------------------------------------------------------------------ */

const SQUARE = 1;
const HALF = 4;

export const squareToXZ = (file: number, rank: number): [number, number] => [
  file - HALF + SQUARE / 2,
  HALF - rank + SQUARE / 2,
];

const fileFromX = (x: number) => Math.floor(x + HALF);
const rankFromZ = (z: number) => Math.floor(HALF - z) + 1;

const squareName = (file: number, rank: number) =>
  `${"abcdefgh"[file] ?? ""}${rank}`.toUpperCase();

const inBoard = (file: number, rank: number) =>
  file >= 0 && file < 8 && rank >= 1 && rank <= 8;

/* ------------------------------------------------------------------ */
/* Piece silhouettes — extruded from our own SVG icon set              */
/* ------------------------------------------------------------------ */

const PIECE_PATHS: Record<string, string> = {
  pawn: "M19 22H5V20H19V22M16 18H8L10.18 10H8V8H10.72L10.79 7.74C10.1 7.44 9.55 6.89 9.25 6.2C8.58 4.68 9.27 2.91 10.79 2.25C12.31 1.58 14.08 2.27 14.74 3.79C15.41 5.31 14.72 7.07 13.2 7.74L13.27 8H16V10H13.82L16 18Z",
  rook: "M5,20H19V22H5V20M17,2V5H15V2H13V5H11V2H9V5H7V2H5V8H7V18H17V8H19V2H17Z",
  knight:
    "M19,22H5V20H19V22M13,2V2C11.75,2 10.58,2.62 9.89,3.66L7,8L9,10L11.06,8.63C11.5,8.32 12.14,8.44 12.45,8.9C12.47,8.93 12.5,8.96 12.5,9V9C12.8,9.59 12.69,10.3 12.22,10.77L7.42,15.57C6.87,16.13 6.87,17.03 7.43,17.58C7.69,17.84 8.05,18 8.42,18H17V6A4,4 0 0,0 13,2Z",
  bishop:
    "M19,22H5V20H19V22M17.16,8.26C18.22,9.63 18.86,11.28 19,13C19,15.76 15.87,18 12,18C8.13,18 5,15.76 5,13C5,10.62 7.33,6.39 10.46,5.27C10.16,4.91 10,4.46 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.46 13.84,4.91 13.54,5.27C14.4,5.6 15.18,6.1 15.84,6.74L11.29,11.29L12.71,12.71L17.16,8.26Z",
  queen:
    "M18,3A2,2 0 0,1 20,5C20,5.81 19.5,6.5 18.83,6.82L17,13.15V18H7V13.15L5.17,6.82C4.5,6.5 4,5.81 4,5A2,2 0 0,1 6,3A2,2 0 0,1 8,5C8,5.5 7.82,5.95 7.5,6.3L10.3,9.35L10.83,5.62C10.33,5.26 10,4.67 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.67 13.67,5.26 13.17,5.62L13.7,9.35L16.47,6.29C16.18,5.94 16,5.5 16,5A2,2 0 0,1 18,3M5,21V23H19V21H5Z",
  king:
    "M19,22H5V20H19V22M17,10C15.58,10 14.26,10.77 13.55,12H13V7H16V5H13V2H11V5H8V7H11V12H10.45C9.35,10.09 6.9,9.43 5,10.54C3.07,11.64 2.42,14.09 3.5,16C4.24,17.24 5.57,18 7,18H17A4,4 0 0,0 21,14A4,4 0 0,0 17,10Z",
};

const pieceGeometry = (
  kind: keyof typeof PIECE_PATHS,
  height: number,
  low = false,
) => {
  const loader = new SVGLoader();
  const parsed = loader.parse(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${PIECE_PATHS[kind]}"/></svg>`,
  );
  const shapes = parsed.paths[0].toShapes();
  const geo = new THREE.ExtrudeGeometry(shapes, {
    depth: 2.4,
    bevelEnabled: true,
    bevelThickness: 0.18,
    bevelSize: 0.14,
    bevelSegments: low ? 1 : 2,
    curveSegments: low ? 3 : 6,
  });
  // SVG y is down → flip upright, seat on the board, centre depth, scale.
  geo.rotateX(Math.PI);
  geo.computeBoundingBox();
  const box = geo.boundingBox!;
  const scale = height / (box.max.y - box.min.y);
  geo.translate(0, -box.min.y, -(box.max.z + box.min.z) / 2);
  geo.scale(scale, scale, scale);
  geo.rotateY(-Math.PI / 2); // face the camera diagonal
  geo.computeVertexNormals();
  return geo;
};

/* ------------------------------------------------------------------ */
/* Layout — a quiet, cinematic opening position                         */
/* ------------------------------------------------------------------ */

type PieceSpec = {
  kind: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
  side: "w" | "b";
  file: number;
  rank: number;
  h: number;
  hero?: boolean; // the knight that plays e4
};

const LAYOUT: PieceSpec[] = [
  { kind: "rook", side: "w", file: 0, rank: 1, h: 1.15 },
  { kind: "bishop", side: "w", file: 5, rank: 1, h: 1.25 },
  { kind: "knight", side: "w", file: 2, rank: 3, h: 1.15, hero: true },
  { kind: "queen", side: "w", file: 3, rank: 1, h: 1.5 },
  { kind: "king", side: "w", file: 4, rank: 1, h: 1.62 },
  { kind: "pawn", side: "w", file: 0, rank: 2, h: 0.85 },
  { kind: "pawn", side: "w", file: 4, rank: 2, h: 0.85 },
  { kind: "pawn", side: "w", file: 7, rank: 2, h: 0.85 },
  { kind: "pawn", side: "b", file: 3, rank: 7, h: 0.85 },
  { kind: "pawn", side: "b", file: 0, rank: 7, h: 0.85 },
  { kind: "bishop", side: "b", file: 2, rank: 8, h: 1.25 },
  { kind: "rook", side: "b", file: 0, rank: 8, h: 1.15 },
  { kind: "king", side: "b", file: 4, rank: 8, h: 1.62 },
];

const BEST_MOVE: [number, number] = [4, 4]; // e4

/* ------------------------------------------------------------------ */

function Board({
  onSquare,
  onBestMoveClick,
  ready,
  reduced,
  low,
}: {
  onSquare: (name: string | null) => void;
  onBestMoveClick: () => void;
  ready: boolean;
  reduced: boolean;
  low: boolean;
}) {
  const [hover, setHover] = useState<[number, number] | null>(null);
  const hoverRef = useRef<THREE.Group>(null);
  const bestRef = useRef<THREE.Group>(null);
  const time = useRef(0);
  const hoverEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.PlaneGeometry(0.96, 0.96)),
    [],
  );

  useEffect(() => () => hoverEdges.dispose(), [hoverEdges]);

  useFrame((_, delta) => {
    time.current += delta;
    if (hoverRef.current && hover) {
      const [x, z] = squareToXZ(hover[0], hover[1]);
      hoverRef.current.position.set(x, 0.02, z);
      hoverRef.current.visible = true;
    } else if (hoverRef.current) {
      hoverRef.current.visible = false;
    }
    if (bestRef.current) {
      const pulse = reduced ? 1 : 0.75 + Math.sin(time.current * 2.2) * 0.25;
      bestRef.current.scale.setScalar(1 + (pulse - 1) * 0.06);
      const mats = bestRef.current.children as THREE.Mesh[];
      mats.forEach((m) => {
        const mat = m.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.35 + pulse * 0.35;
      });
    }
  });

  const handleMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const file = fileFromX(e.point.x);
    const rank = rankFromZ(e.point.z);
    if (!inBoard(file, rank)) {
      setHover(null);
      onSquare(null);
      return;
    }
    setHover([file, rank]);
    onSquare(squareName(file, rank));
  };

  const handleOut = () => {
    setHover(null);
    onSquare(null);
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const file = fileFromX(e.point.x);
    const rank = rankFromZ(e.point.z);
    if (!inBoard(file, rank)) return;
    const name = squareName(file, rank);
    const route = squareRoutes[name];
    if (file === BEST_MOVE[0] && rank === BEST_MOVE[1]) {
      onBestMoveClick();
      return;
    }
    if (route) {
      window.dispatchEvent(new CustomEvent("portfolio:nav", { detail: route.href }));
      return;
    }
  };

  // One merged mesh for all 64 tiles — a single draw call instead of 64.
  const tiles = useMemo(() => {
    const light = new THREE.Color("#25262a");
    const dark = new THREE.Color("#0e0f11");
    const h = SQUARE * 0.49;
    const positions: number[] = [];
    const normals: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];
    let v = 0;
    for (let f = 0; f < 8; f++) {
      for (let r = 1; r <= 8; r++) {
        const [x, z] = squareToXZ(f, r);
        const c = (f + r) % 2 === 1 ? light : dark;
        const corners = [
          [-h, -h],
          [h, -h],
          [h, h],
          [-h, h],
        ];
        for (const [dx, dz] of corners) {
          positions.push(x + dx, 0.001, z + dz);
          normals.push(0, 1, 0);
          colors.push(c.r, c.g, c.b);
        }
        indices.push(v, v + 2, v + 1, v, v + 3, v + 2);
        v += 4;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.setIndex(indices);
    return geo;
  }, []);

  useEffect(() => () => tiles.dispose(), [tiles]);

  const [bestX, bestZ] = squareToXZ(BEST_MOVE[0], BEST_MOVE[1]);

  return (
    <group>
      {/* slab */}
      <mesh position={[0, -0.3, 0]} receiveShadow={!low}>
        <boxGeometry args={[9.1, 0.6, 9.1]} />
        {low ? (
          <meshLambertMaterial color="#0a0b0c" />
        ) : (
          <meshStandardMaterial color="#0a0b0c" roughness={0.85} metalness={0.2} />
        )}
      </mesh>

      {/* tiles — merged into one draw call */}
      <mesh geometry={tiles} receiveShadow={!low}>
        {low ? (
          <meshLambertMaterial vertexColors />
        ) : (
          <meshStandardMaterial vertexColors roughness={0.75} metalness={0.12} />
        )}
      </mesh>

      {/* hover highlight */}
      <group ref={hoverRef} visible={false}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.96, 0.96]} />
          <meshBasicMaterial
            color="#1fde85"
            transparent
            opacity={0.16}
            depthWrite={false}
          />
        </mesh>
        <lineSegments rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <edgesGeometry args={[hoverEdges]} />
          <lineBasicMaterial color="#1fde85" transparent opacity={0.9} />
        </lineSegments>
      </group>

      {/* best move marker: e4 */}
      <group ref={bestRef} position={[bestX, 0.02, bestZ]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.34, 0.4, 4, 1, Math.PI / 4]} />
          <meshBasicMaterial
            color="#1fde85"
            transparent
            opacity={0.7}
            depthWrite={false}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <planeGeometry args={[0.9, 0.9]} />
          <meshBasicMaterial
            color="#1fde85"
            transparent
            opacity={0.07}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* raycast surface */}
      <mesh
        position={[0, 0.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerMove={handleMove}
        onPointerOut={handleOut}
        onClick={handleClick}
      >
        <planeGeometry args={[8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <Pieces ready={ready} reduced={reduced} low={low} />
    </group>
  );
}

/* ------------------------------------------------------------------ */

function Pieces({
  ready,
  reduced,
  low,
}: {
  ready: boolean;
  reduced: boolean;
  low: boolean;
}) {
  const geos = useMemo(() => {
    const map = new Map<string, THREE.BufferGeometry>();
    for (const kind of Object.keys(PIECE_PATHS) as (keyof typeof PIECE_PATHS)[]) {
      const spec = LAYOUT.find((p) => p.kind === kind);
      map.set(kind, pieceGeometry(kind, spec?.h ?? 1, low));
    }
    return map;
  }, [low]);

  useEffect(() => {
    return () => {
      geos.forEach((g) => g.dispose());
    };
  }, [geos]);

  // Two shared materials for all 13 pieces (one per side) — fewer programs
  // to compile and upload on the first frame.
  const mats = useMemo(
    () =>
      low
        ? {
            w: new THREE.MeshLambertMaterial({ color: "#eae6da" }),
            b: new THREE.MeshLambertMaterial({
              color: "#101114",
              emissive: new THREE.Color("#05070a"),
              emissiveIntensity: 0.6,
            }),
          }
        : {
            w: new THREE.MeshStandardMaterial({
              color: "#eae6da",
              roughness: 0.5,
              metalness: 0.05,
            }),
            b: new THREE.MeshStandardMaterial({
              color: "#101114",
              roughness: 0.35,
              metalness: 0.55,
              emissive: new THREE.Color("#05070a"),
            }),
          },
    [low],
  );

  useEffect(
    () => () => {
      mats.w.dispose();
      mats.b.dispose();
    },
    [mats],
  );

  return (
    <group>
      {LAYOUT.map((spec, i) => (
        <Piece
          key={`${spec.kind}-${i}`}
          spec={spec}
          geos={geos}
          mat={mats[spec.side]}
          ready={ready}
          reduced={reduced}
          low={low}
        />
      ))}
    </group>
  );
}

function Piece({
  spec,
  geos,
  mat,
  ready,
  reduced,
  low,
}: {
  spec: PieceSpec;
  geos: Map<string, THREE.BufferGeometry>;
  mat: THREE.Material;
  ready: boolean;
  reduced: boolean;
  low: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const [x, z] = squareToXZ(spec.file, spec.rank);
  const start = useRef(new THREE.Vector3(x, 0, z));
  const target = useRef(new THREE.Vector3(x, 0, z));
  const moving = useRef(false);
  const landed = useRef(false);

  useEffect(() => {
    if (!ready) return;
    if (reduced) {
      progress.current = 1;
      if (ref.current) ref.current.scale.setScalar(1);
    }
  }, [ready, reduced]);

  // Signature move: hero knight travels to e4.
  useEffect(() => {
    const onMove = () => {
      if (!spec.hero) return;
      const [tx, tz] = squareToXZ(BEST_MOVE[0], BEST_MOVE[1]);
      target.current.set(tx, 0, tz);
      moving.current = true;
    };
    window.addEventListener("portfolio:move", onMove);
    return () => window.removeEventListener("portfolio:move", onMove);
  }, [spec.hero]);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;

    if (ready && progress.current < 1) {
      progress.current = Math.min(1, progress.current + delta * (reduced ? 10 : 1.4));
      const p = 1 - Math.pow(1 - progress.current, 3);
      g.scale.setScalar(Math.max(0.001, p));
      g.position.y = (1 - p) * (spec.h * 1.2);
      g.rotation.y = (1 - p) * 0.9;
      return;
    }

    if (moving.current) {
      const step = delta / (reduced ? 0.3 : 1.15);
      const p = Math.min(1, (g.userData.p ?? 0) + step);
      g.userData.p = p;
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      g.position.x = THREE.MathUtils.lerp(start.current.x, target.current.x, eased);
      g.position.z = THREE.MathUtils.lerp(start.current.z, target.current.z, eased);
      g.position.y = Math.sin(eased * Math.PI) * 0.9;
      if (p >= 1 && !landed.current) {
        landed.current = true;
        moving.current = false;
        g.position.y = 0;
        window.dispatchEvent(new CustomEvent("portfolio:move-landed"));
      }
    }
  });

  return (
    <group ref={ref} position={[x, ready ? 0 : spec.h * 1.2, z]} scale={ready ? 1 : 0.001}>
      <mesh geometry={geos.get(spec.kind)} material={mat} castShadow={!low} receiveShadow={!low} />
    </group>
  );
}

/* ------------------------------------------------------------------ */

function Rig({ reduced }: { reduced: boolean }) {
  const base = useMemo(() => new THREE.Vector3(0, 6.4, 8.6), []);
  const look = useMemo(() => new THREE.Vector3(0, 0.4, -0.4), []);
  const t = useRef(0);

  useFrame((state, delta) => {
    const camera = state.camera;
    const aspect = state.size.width / Math.max(1, state.size.height);
    const fit = aspect < 1 ? 1 + (1 - aspect) * 2.2 : 1;
    const lateralFactor = aspect < 1 ? 0.15 : 1;
    const baseVec = new THREE.Vector3(0, base.y * fit, base.z * fit);
    const lookVec = new THREE.Vector3(look.x, look.y, look.z);
    if (reduced) {
      camera.position.copy(baseVec);
      camera.lookAt(lookVec);
      return;
    }
    t.current += delta;
    const sway = Math.sin(t.current * 0.14) * 0.55 * lateralFactor;
    const px = state.pointer.x * 1.1 * lateralFactor;
    const py = state.pointer.y * 0.5;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, baseVec.x + sway + px, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, baseVec.y + py, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, baseVec.z + Math.cos(t.current * 0.1) * 0.3, 0.04);
    camera.lookAt(lookVec);
  });
  return null;
}

/* ------------------------------------------------------------------ */

export type ChessSceneProps = {
  ready: boolean;
  reduced: boolean;
  shadows: boolean;
  /** "low" renders at 1x without MSAA — used on phones and small viewports. */
  quality?: "high" | "low";
  onBestMove?: () => void;
};

export default function ChessScene({
  ready,
  reduced,
  shadows,
  quality = "high",
  onBestMove,
}: ChessSceneProps) {
  const low = quality === "low";
  const [square, setSquare] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("cursor:label", { detail: square ?? "" }));
  }, [square]);

  // Stop the render loop entirely while the hero is off-screen.
  useEffect(() => {
    const el = hostRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: "10% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleBestMove = () => {
    window.dispatchEvent(new CustomEvent("portfolio:move"));
    onBestMove?.();
  };

  return (
    <div ref={hostRef} className="absolute inset-0">
    <Canvas
      frameloop={visible ? "always" : "never"}
      dpr={low ? 1 : [1, 1.75]}
      shadows={shadows ? "percentage" : false}
      camera={{ fov: 34, position: [0, 6.4, 8.6], near: 0.1, far: 60 }}
      gl={
        low
          ? {
              antialias: false,
              alpha: false,
              stencil: false,
              powerPreference: "high-performance",
            }
          : { antialias: true, alpha: true, powerPreference: "high-performance" }
      }
      style={{ touchAction: "pan-y" }}
    >
      <color attach="background" args={["#08090a"]} />
      <fogExp2 attach="fog" args={["#08090a", 0.036]} />

      <ambientLight intensity={low ? 0.55 : 0.35} />
      <directionalLight
        position={[6, 11, 4]}
        intensity={2.4}
        castShadow={shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0004}
      />
      {!low && (
        <directionalLight position={[-7, 5, -6]} intensity={0.5} color="#8fa8ff" />
      )}
      {!low && (
        <pointLight position={[-4, 2.4, -6]} intensity={26} distance={20} color="#1fde85" />
      )}
      {!low && (
        <pointLight position={[5, 1.4, 7]} intensity={10} distance={16} color="#b9975b" />
      )}

      <Board
        ready={ready}
        reduced={reduced}
        low={low}
        onSquare={setSquare}
        onBestMoveClick={handleBestMove}
      />
      <Rig reduced={reduced} />
    </Canvas>
    </div>
  );
}
