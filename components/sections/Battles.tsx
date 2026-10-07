"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { achievements } from "@/data/achievements";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

export function Battles() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => {
      const el = track.parentElement as HTMLElement | null;
      const width = el ? el.clientWidth : window.innerWidth;
      return Math.max(0, track.scrollWidth - width);
    };
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: () => `+=${distance() + window.innerHeight * 0.5}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { x: 0 });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="battles"
      className="relative overflow-hidden border-t border-line"
    >
      <div className="shell flex h-full flex-col justify-center py-[clamp(4rem,10vh,7rem)]">
        <div className="mb-[clamp(2rem,5vh,4rem)] flex items-baseline justify-between">
          <h2 className="t-eyebrow">04 — BATTLES</h2>
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-accent">
            SCOREBOARD
          </span>
        </div>

        <div
          ref={trackRef}
          className="flex flex-col gap-10 motion-safe:lg:h-[calc(100vh-8rem)] motion-safe:lg:flex-row motion-safe:lg:items-center motion-safe:lg:gap-0 motion-safe:lg:will-change-transform"
        >
          {achievements.map((a, i) => (
            <Reveal
              key={a.index}
              delay={i * 80}
              className="motion-safe:lg:h-auto motion-safe:lg:w-[clamp(22rem,28vw,30rem)] motion-safe:lg:shrink-0 motion-safe:lg:pr-[clamp(1.75rem,3.5vw,3.5rem)]"
            >
              <div className="flex h-full flex-col justify-between border-t border-line pt-6 motion-safe:lg:border-l motion-safe:lg:border-t-0 motion-safe:lg:pl-8 motion-safe:lg:pt-0">
                <div className="flex items-baseline justify-between">
                  <span className="t-meta text-ivory-3">{a.move}</span>
                  <span className="font-mono text-[0.7rem] tracking-[0.2em] text-accent">
                    {a.index}
                  </span>
                </div>

                <Counter
                  value={a.value}
                  className="t-num block py-4 text-ivory"
                />

                <div>
                  <div className="t-eyebrow mb-3 !text-ivory">{a.label}</div>
                  <p className="max-w-[34ch] text-[0.85rem] leading-relaxed text-ivory-2">
                    {a.context}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-[clamp(2rem,5vh,3.5rem)] hidden items-center justify-between border-t border-line pt-4 lg:flex">
          <span className="t-meta">DRAGGED BY THE SCROLL — NO MOVE WASTED</span>
          <span className="t-meta text-accent">05 MOVES</span>
        </div>
      </div>
    </section>
  );
}