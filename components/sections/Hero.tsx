"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { profile } from "@/data/profile";
import { scrollToId } from "@/lib/lenis";
import { useMediaQuery, useReducedMotion } from "@/hooks/useMediaQuery";

const ChessScene = dynamic(() => import("@/components/three/ChessScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-ink" />,
});

export function Hero() {
  const [ready, setReady] = useState(false);
  const [showScene, setShowScene] = useState(false);
  const reduced = useReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)");
  const shadows = wide && !reduced;

  useEffect(() => {
    const onReady = () => {
      setReady(true);
      // Mount the WebGL scene only once the opening choreography has started —
      // keeps three.js evaluation out of the first-paint window.
      const ric =
        window.requestIdleCallback ??
        ((cb: () => void) => window.setTimeout(cb, 200));
      ric(() => setShowScene(true));
    };
    window.addEventListener("portfolio:ready", onReady);

    const onLanded = () => window.setTimeout(() => scrollToId("#position"), 380);
    window.addEventListener("portfolio:move-landed", onLanded);
    const onNav = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) {
        window.setTimeout(() => scrollToId(detail), 250);
      }
    };
    window.addEventListener("portfolio:nav", onNav as EventListener);

    return () => {
      window.removeEventListener("portfolio:ready", onReady);
      window.removeEventListener("portfolio:move-landed", onLanded);
      window.removeEventListener("portfolio:nav", onNav as EventListener);
    };
  }, []);

  const playMove = () => window.dispatchEvent(new CustomEvent("portfolio:move"));

  return (
    <section id="opening" className="relative isolate min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 z-0">
        {showScene && (
          <ChessScene
            ready={ready}
            reduced={reduced}
            shadows={shadows}
            quality={wide ? "high" : "low"}
            onBestMove={playMove}
          />
        )}
      </div>

      {/* legibility gradients */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[55%] bg-gradient-to-t from-ink via-ink/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-ink/80 to-transparent" />

      <div className="shell relative z-20 flex min-h-[100svh] flex-col justify-between pb-[clamp(2rem,6vh,4rem)] pt-[clamp(6rem,14vh,9rem)]">
        <div className="flex items-start justify-between">
          <div
            className="transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(16px)",
              transitionDelay: "60ms",
            }}
          >
            <span className="t-eyebrow">PORTFOLIO — 2026</span>
          </div>
          <div
            className="max-w-[22rem] text-right transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(16px)",
              transitionDelay: "120ms",
            }}
          >
            <span className="t-meta">{profile.location.toUpperCase()} · KU</span>
          </div>
        </div>

        <div>
          <h1 className="t-display-1 mb-[clamp(1rem,3vh,2rem)]">
            <span className={`line-mask ${ready ? "is-in" : ""}`}>
              <span style={{ transitionDelay: "80ms" }}>AAYUSH</span>
            </span>
            <span className={`line-mask italic text-ivory-2 ${ready ? "is-in" : ""}`}>
              <span style={{ transitionDelay: "160ms" }}>NEUPANE</span>
            </span>
          </h1>

          <div
            className="flex flex-wrap items-end justify-between gap-8 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: ready ? "none" : "translateY(24px)",
              transitionDelay: "260ms",
            }}
          >
            <p className="max-w-md text-[0.95rem] leading-relaxed text-ivory-2">
              {profile.heroSupport}
            </p>

            <div className="flex items-center gap-8">
              <div className="hidden text-right sm:block">
                <div className="font-mono text-[0.7rem] tracking-[0.3em] text-accent">
                  {profile.tagline.join(" ")}
                </div>
                <div className="t-meta mt-1 text-ivory-3">THE BEST MOVE ISN&apos;T THE FASTEST</div>
              </div>
              <button
                onClick={playMove}
                data-cursor-label="E4"
                className="btn-move group"
                aria-label="Play the move e4 and continue"
              >
                PLAY E4
                <span className="arrow text-accent group-hover:text-ink">→</span>
              </button>
            </div>
          </div>

          <div
            className="mt-[clamp(1.5rem,4vh,3rem)] flex items-center justify-between border-t border-line pt-4 transition-opacity duration-1000"
            style={{ opacity: ready ? 1 : 0, transitionDelay: "380ms" }}
          >
            <span className="t-meta">{profile.roleLine}</span>
            <span className="t-meta hidden animate-pulse sm:block">SCROLL ↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
