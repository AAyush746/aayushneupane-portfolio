"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { scrollToId, scrollToTop } from "@/lib/lenis";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { ArchitectureFlow } from "./ArchitectureFlow";
import { ProjectVisual } from "./ProjectVisual";

function Block({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-[clamp(2.5rem,7vh,5rem)]">
      <div className="grid gap-[clamp(1.5rem,4vw,4rem)] lg:grid-cols-[14rem_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-accent">
              {index}
            </span>
            <h2 className="t-eyebrow !text-ivory">{title}</h2>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const cs = project.caseStudy;

  useEffect(() => {
    scrollToTop();
  }, [project.slug]);

  return (
    <article className="relative">
      {/* ---------- masthead ---------- */}
      <header className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(241,238,230,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(241,238,230,0.06) 1px, transparent 1px)",
            backgroundSize: "clamp(48px,7vw,96px) clamp(48px,7vw,96px)",
            maskImage: "radial-gradient(ellipse at 70% 30%, black, transparent 75%)",
          }}
        />

        <div className="shell relative pt-[clamp(7rem,16vh,11rem)] pb-[clamp(3rem,9vh,6rem)]">
          <div className="mb-[clamp(2rem,6vh,4rem)] flex flex-wrap items-baseline justify-between gap-4">
            <Link
              href="/#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("#work");
              }}
              className="t-meta link-underline hover:text-accent"
            >
              ← ALL OPENINGS
            </Link>
            <span className="font-mono text-[0.7rem] tracking-[0.24em] text-accent">
              {project.notation.toUpperCase()} · {project.opening}
            </span>
          </div>

          <div className="grid items-end gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <div className="t-eyebrow mb-5">
                PROJECT <span className="text-accent">{project.index}</span>
              </div>
              <h1 className="t-display-1">
                <LineReveal
                  lines={[project.name]}
                  lineClassName="block"
                  step={0}
                />
              </h1>
              <p className="t-display-3 mt-4 max-w-[24ch] !text-[clamp(1.05rem,2vw,1.6rem)] italic text-ivory-2">
                {project.type}
              </p>
            </div>

            <Reveal delay={200}>
              <div className="border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <div className="t-display-3 text-accent">{project.metric.value}</div>
                <div className="t-meta mt-2 max-w-[26ch]">{project.metric.label}</div>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  {project.tech.map((t) => (
                    <span key={t} className="t-meta !text-ivory-3">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ---------- hero visual ---------- */}
      <div className="shell py-[clamp(2rem,6vh,4rem)]">
        <Reveal>
          <ProjectVisual kind={project.visual} name={project.name} />
        </Reveal>
      </div>

      <div className="shell">
        <Block index="01" title="THE PROBLEM">
          <Reveal>
            <p className="t-body max-w-[64ch] !text-[clamp(1rem,1.3vw,1.25rem)]">
              {cs.problem}
            </p>
          </Reveal>
        </Block>

        <Block index="02" title="THE APPROACH">
          <Reveal>
            <p className="t-body max-w-[64ch] !text-[clamp(1rem,1.3vw,1.25rem)]">
              {cs.approach}
            </p>
          </Reveal>
        </Block>

        <Block index="03" title="THE ARCHITECTURE">
          <ArchitectureFlow steps={cs.architecture} />
        </Block>

        <Block index="04" title="THE IMPLEMENTATION">
          <ol className="space-y-6">
            {cs.implementation.map((line, i) => (
              <Reveal key={line} delay={i * 80}>
                <li className="flex gap-5 border-b border-line pb-6 last:border-b-0 sm:gap-8">
                  <span className="font-mono text-[0.65rem] leading-relaxed tracking-[0.2em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="t-body max-w-[62ch] !text-ivory">{line}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </Block>

        <Block index="05" title="THE RESULTS">
          <ul className="space-y-5">
            {cs.results.map((line, i) => (
              <Reveal key={line} delay={i * 80}>
                <li className="relative border-l-2 border-accent/70 pl-5 sm:pl-7">
                  <span className="t-display-3 !text-[clamp(1.05rem,2vw,1.6rem)]">
                    {line}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Block>

        <Block index="06" title="WHAT I LEARNED">
          <Reveal>
            <blockquote className="max-w-[36ch]">
              <p
                className="text-[clamp(1.35rem,3vw,2.4rem)] leading-[1.15] text-ivory italic"
                style={{ fontFamily: "var(--font-display)" }}
              >
                “{cs.learned}”
              </p>
            </blockquote>
          </Reveal>
        </Block>

        <Block index="07" title="TECH STACK">
          <div className="flex flex-wrap gap-3">
            {cs.stack.map((s, i) => (
              <Reveal key={s} delay={i * 60}>
                <span className="inline-block border border-line px-4 py-2 font-mono text-[0.68rem] tracking-[0.16em] text-ivory-2 transition-colors duration-300 hover:border-accent hover:text-accent">
                  {s}
                </span>
              </Reveal>
            ))}
          </div>
        </Block>

        {/* ---------- actions ---------- */}
        <section className="border-t border-line py-[clamp(2.5rem,7vh,5rem)]">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-5">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="btn-move"
                  data-cursor-label={l.label.slice(0, 4)}
                >
                  {l.label} <span className="arrow text-accent">↗</span>
                </a>
              ))}
            </div>

            <Link
              href={`/work/${next.slug}`}
              className="group flex items-baseline gap-4 text-right"
              data-cursor-label="NEXT"
            >
              <span className="t-meta !text-ivory-3">NEXT OPENING</span>
              <span className="t-display-3 transition-colors duration-300 group-hover:text-accent">
                {next.name}
              </span>
              <span className="font-mono text-[0.8rem] text-accent">→</span>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
