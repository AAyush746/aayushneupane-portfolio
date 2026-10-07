"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import { squareRoutes } from "@/data/navigation";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { scrollToId } from "@/lib/lenis";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const PAWN_PATH =
  "M19 22H5V20H19V22M16 18H8L10.18 10H8V8H10.72L10.79 7.74C10.1 7.44 9.55 6.89 9.25 6.2C8.58 4.68 9.27 2.91 10.79 2.25C12.31 1.58 14.08 2.27 14.74 3.79C15.41 5.31 14.72 7.07 13.2 7.74L13.27 8H16V10H13.82L16 18Z";

export function Chess() {
  const [pawnFile, setPawnFile] = useState(4); // starts on e2
  const [pawnRank, setPawnRank] = useState(2);
  const [moved, setMoved] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  const squares: { name: string; file: number; rank: number; dark: boolean }[] = [];
  for (let rank = 8; rank >= 1; rank--) {
    for (let file = 0; file < 8; file++) {
      squares.push({
        name: `${FILES[file]}${rank}`.toUpperCase(),
        file,
        rank,
        dark: (file + rank) % 2 === 0,
      });
    }
  }

  const handleSquare = (name: string, file: number, rank: number) => {
    const route = squareRoutes[name];
    if (!route) return;
    setFlash(name);

    if (name === "E4" && !moved) {
      setPawnFile(file);
      setPawnRank(rank);
      setMoved(true);
      window.setTimeout(() => scrollToId(route.href), 1100);
    } else {
      window.setTimeout(() => scrollToId(route.href), 250);
    }
    window.setTimeout(() => setFlash(null), 1400);
  };

  return (
    <section id="chess" className="relative border-t border-line py-[clamp(5rem,14vh,9rem)]">
      <div className="shell">
        <div className="mb-[clamp(2.5rem,7vh,5rem)] flex items-baseline justify-between">
          <h2 className="t-eyebrow">08 — THE BOARD</h2>
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-accent">G7</span>
        </div>

        <div className="grid items-start gap-[clamp(2.5rem,6vw,6rem)] lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h3 className="mb-6 max-w-[min(100%,34rem)]">
              <LineReveal
                lines={profile.chess.headline.split(" ")}
                className="t-display-2"
                lineClassName="block"
                step={70}
              />
            </h3>

            <Reveal delay={250}>
              <div className="mb-6 inline-flex items-center gap-3 border border-accent/40 px-4 py-2">
                <span className="text-accent">♞</span>
                <span className="t-meta !text-accent">{profile.chess.achievement}</span>
              </div>
              <p className="t-body max-w-[46ch]">{profile.chess.body}</p>
            </Reveal>

            <Reveal delay={350}>
              <div className="mt-10 border-t border-line pt-5">
                <div className="t-eyebrow mb-3">NAVIGATE BY BOARD</div>
                <p className="max-w-[46ch] text-[0.85rem] leading-relaxed text-ivory-2">
                  Every section has a square. Click one to jump — start with{" "}
                  <span className="text-accent">e4</span> if you want the opening
                  move.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="relative mx-auto w-full max-w-[34rem]">
              <div className="relative aspect-square border border-line">
                <div className="grid h-full w-full grid-cols-8 grid-rows-8">
                  {squares.map((sq) => {
                    const route = squareRoutes[sq.name];
                    const isFlash = flash === sq.name;
                    return (
                      <button
                        key={sq.name}
                        onClick={() => handleSquare(sq.name, sq.file, sq.rank)}
                        data-cursor-label={route ? route.label : sq.name}
                        aria-label={
                          route ? `${sq.name} — go to ${route.label}` : `Square ${sq.name}`
                        }
                        className={`group relative flex items-start justify-start p-1 transition-colors duration-300 ${
                          sq.dark ? "bg-[#0e0f11]" : "bg-[#1d1e21]"
                        } ${isFlash ? "!bg-accent/30" : route ? "hover:bg-accent/15" : ""}`}
                      >
                        {route && (
                          <span
                            className={`mt-1 h-1.5 w-1.5 rotate-45 border border-accent/70 transition-colors duration-300 ${
                              isFlash ? "bg-accent" : ""
                            }`}
                          />
                        )}
                        <span className="absolute bottom-0.5 right-1 font-mono text-[0.5rem] tracking-wider text-ivory-3/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          {sq.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* the pawn that plays e4 */}
                <div
                  className="pointer-events-none absolute transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    left: `${pawnFile * 12.5}%`,
                    top: `${(8 - pawnRank) * 12.5}%`,
                    width: "12.5%",
                    height: "12.5%",
                  }}
                  aria-hidden
                >
                  <svg viewBox="0 0 24 24" className="h-full w-full p-[18%]">
                    <path d={PAWN_PATH} fill="#eae6da" />
                  </svg>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="t-meta !text-ivory-3">
                  {moved ? "1. e4 — GOOD MOVE." : "1. e2 — YOUR MOVE."}
                </span>
                <span className="font-mono text-[0.65rem] tracking-[0.2em] text-accent">
                  {moved ? "E4" : "E2"}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
