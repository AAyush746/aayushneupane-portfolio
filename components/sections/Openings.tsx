"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

gsap.registerPlugin(ScrollTrigger);

export function Openings() {
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
      id="work"
      className="relative overflow-hidden border-t border-line"
    >
      <div className="shell flex h-full flex-col justify-center py-[clamp(4rem,10vh,7rem)]">
        <div className="mb-[clamp(1.5rem,4vh,3rem)] flex items-baseline justify-between">
          <h2 className="t-eyebrow">05 — OPENINGS</h2>
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-accent">Nf3</span>
        </div>

        <div ref={trackRef} className="flex flex-col gap-16 motion-safe:lg:w-max motion-safe:lg:flex-row motion-safe:lg:items-center motion-safe:lg:gap-0 motion-safe:lg:will-change-transform">
          {projects.map((p) => (
            <article
              key={p.slug}
              className="motion-safe:lg:w-[min(76rem,88vw)] motion-safe:lg:shrink-0 motion-safe:lg:pr-[clamp(3rem,6vw,6rem)]"
            >
              <div className="grid items-start gap-8 border-t border-line pt-6 motion-safe:lg:grid-cols-[1.1fr_0.9fr] motion-safe:lg:gap-12">
                <div className="flex flex-col">
                  <div className="flex items-baseline justify-between">
                    <span className="t-meta text-accent">
                      {p.index} · {p.notation.toUpperCase()} · {p.opening}
                    </span>
                    <span className="t-meta text-ivory-3">{p.type}</span>
                  </div>

                  <h3 className="t-display-2 mt-4">{p.name}</h3>

                  <p className="t-body mt-4 max-w-[46ch]">{p.valueProp}</p>

                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                    {p.tech.map((t) => (
                      <span key={t} className="t-meta !text-ivory-3">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex items-end justify-between gap-6 border-t border-line pt-5">
                    <div>
                      <div className="t-display-3 text-accent">{p.metric.value}</div>
                      <div className="t-meta mt-1 max-w-[26ch]">{p.metric.label}</div>
                    </div>
                    <Link
                      href={`/work/${p.slug}`}
                      className="btn-move shrink-0"
                      data-cursor-label="OPEN"
                    >
                      CASE STUDY
                      <span className="arrow text-accent">→</span>
                    </Link>
                  </div>
                </div>

                <div className="motion-safe:lg:pt-10">
                  <ProjectVisual kind={p.visual} name={p.name} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-[clamp(1.5rem,4vh,3rem)] hidden items-center justify-between border-t border-line pt-4 lg:flex">
          <span className="t-meta">FIVE OPENINGS — EACH ONE A DIFFERENT KIND OF PRESSURE</span>
          <span className="t-meta text-accent">SCROLL →</span>
        </div>
      </div>
    </section>
  );
}