"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const NOTATION = [
  "e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7",
  "Re1", "b5", "Bb3", "d6", "c3", "O-O", "h3", "Nb8", "d4", "Nbd7",
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = useState(0);
  const [moveIndex, setMoveIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  // Skip — never hold the visitor hostage to a loading screen.
  const skip = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setPercent(100);
    setLeaving(true);
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("portfolio:ready"));
      onComplete();
    }, 760);
  }, [onComplete]);

  useEffect(() => {
    if (done.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 300 : 900;
    const start = performance.now();
    let raf = 0;
    const timers: number[] = [];

    const notationTimer = window.setInterval(
      () => setMoveIndex((i) => (i + 1) % NOTATION.length),
      reduced ? 400 : 140,
    );

    const settle = (leaveDelay: number, doneDelay: number) => {
      timers.push(window.setTimeout(() => setLeaving(true), leaveDelay));
      timers.push(
        window.setTimeout(() => {
          window.dispatchEvent(new CustomEvent("portfolio:ready"));
          onComplete();
        }, doneDelay),
      );
    };

    let lastPaint = -1;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(eased * 100);
      // Re-render at ~12fps instead of every frame — the counter is decorative.
      if (next !== lastPaint && (next === 100 || now - lastPaint > 80)) {
        lastPaint = now;
        setPercent(next);
      }
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!done.current) {
        done.current = true;
        window.clearInterval(notationTimer);
        settle(reduced ? 60 : 140, reduced ? 240 : 620);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (["Enter", "Escape", " "].includes(e.key)) {
        cancelAnimationFrame(raf);
        window.clearInterval(notationTimer);
        skip();
      }
    };
    window.addEventListener("keydown", onKey);

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(notationTimer);
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("keydown", onKey);
    };
  }, [onComplete, skip]);

  return (
    <div
      aria-hidden
      onClick={skip}
      className={`fixed inset-0 z-[110] flex cursor-pointer flex-col justify-between bg-ink px-[clamp(1.25rem,4vw,4rem)] py-8 transition-transform duration-[760ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        leaving ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="t-meta text-ivory-2">AAYUSH NEUPANE</span>
        <span className="t-meta text-ivory-2">CLICK TO SKIP</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="min-w-0">
          <div className="t-eyebrow mb-3 text-accent">THE OPENING BOOK</div>
          <div className="font-mono text-[clamp(0.9rem,2.6vw,1.6rem)] tracking-[0.18em] text-ivory">
            {NOTATION.slice(0, 8).map((m, i) => (
              <span
                key={m + i}
                className={i === moveIndex % 8 ? "text-accent" : "text-ivory-3"}
              >
                {m}{" "}
              </span>
            ))}
          </div>
        </div>

        <div className="text-right">
          <div className="font-display leading-none text-accent text-[clamp(4rem,16vw,12rem)] tracking-tight">
            E4
          </div>
          <div className="font-mono text-[clamp(1rem,3vw,2rem)] tabular-nums text-ivory-2">
            {String(percent).padStart(3, "0")}%
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-line">
        <div
          className="h-px bg-accent transition-[width] duration-100 ease-linear"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
