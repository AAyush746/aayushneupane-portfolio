"use client";

import { useEffect, useRef, useState } from "react";
import { useFinePointer, useReducedMotion } from "@/hooks/useMediaQuery";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("has-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let dx = x;
    let dy = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible(true);
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor-label]") as
        | HTMLElement
        | null;
      setLabel(target?.dataset.cursorLabel ?? "");
    };
    const onLeave = () => setVisible(false);

    const loop = () => {
      dx += (x - dx) * 0.18;
      dy += (y - dy) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onBoardLabel = (e: Event) => {
      setLabel((e as CustomEvent<string>).detail ?? "");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("cursor:label", onBoardLabel);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("cursor:label", onBoardLabel);
      document.body.classList.remove("has-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  const hasLabel = label.length > 0;

  return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[120] transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <div
          ref={dotRef}
          className="absolute left-0 top-0 -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-accent shadow-[0_0_12px_2px_rgba(31,222,133,0.6)]"
        />
        <div
          ref={ringRef}
          className="absolute left-0 top-0 h-px w-px"
        >
        <div
          className={`absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[width,height,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            hasLabel
              ? "h-16 w-16 border-accent bg-accent/10 shadow-[0_0_40px_8px_rgba(31,222,133,0.25)]"
              : "h-9 w-9 border-ivory/40 shadow-[0_0_30px_6px_rgba(31,222,133,0.18)]"
          }`}
        >
          <span
            ref={labelRef}
            className={`font-mono text-[0.65rem] tracking-[0.18em] text-accent transition-opacity duration-200 ${
              hasLabel ? "opacity-100" : "opacity-0"
            }`}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
