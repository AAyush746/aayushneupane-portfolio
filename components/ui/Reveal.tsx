"use client";

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.05,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    const t = window.setTimeout(() => setInView(true), 4000);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [threshold]);

  return (
    <div
      ref={ref as any}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      data-as={typeof As === "string" ? As : undefined}
    >
      {children}
    </div>
  );
}
export function LineReveal({
  lines,
  className = "",
  lineClassName = "",
  baseDelay = 0,
  step = 90,
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  baseDelay?: number;
  step?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    const t = window.setTimeout(() => setInView(true), 4000);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={`line-mask ${inView ? "is-in" : ""} ${lineClassName}`}
        >
          <span style={{ transitionDelay: `${baseDelay + i * step}ms` }}>{line}</span>
        </span>
      ))}
    </div>
  );
}
