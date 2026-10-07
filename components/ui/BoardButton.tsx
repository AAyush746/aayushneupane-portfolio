"use client";

import { scrollToId } from "@/lib/lenis";

export function BoardButton({
  label,
  target = "#opening",
  cursor = "A1",
}: {
  label: string;
  target?: string;
  cursor?: string;
}) {
  return (
    <button onClick={() => scrollToId(target)} className="btn-move" data-cursor-label={cursor}>
      {label} <span className="arrow text-accent">↺</span>
    </button>
  );
}
