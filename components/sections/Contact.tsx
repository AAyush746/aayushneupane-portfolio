"use client";

import { profile } from "@/data/profile";
import { LineReveal, Reveal } from "@/components/ui/Reveal";

const MINI_SQUARES = Array.from({ length: 64 }, (_, i) => {
  const file = i % 8;
  const rank = 7 - Math.floor(i / 8) + 1;
  return { file, rank, dark: (file + rank) % 2 === 0, name: `${file}${rank}` };
});

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line py-[clamp(5rem,16vh,11rem)]"
    >
      {/* faint board motif */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 hidden h-[min(70vh,44rem)] w-[min(70vh,44rem)] -translate-y-1/2 translate-x-1/3 opacity-[0.16] lg:block"
      >
        <svg viewBox="0 0 8 8" className="h-full w-full">
          {MINI_SQUARES.map((sq) => (
            <rect
              key={sq.name}
              x={sq.file}
              y={8 - sq.rank}
              width="1"
              height="1"
              fill={sq.file === 4 && sq.rank === 4 ? "#1fde85" : "none"}
              stroke="#f1eee6"
              strokeOpacity={0.5}
              strokeWidth="0.012"
            />
          ))}
        </svg>
      </div>

      <div className="shell relative">
        <div className="mb-[clamp(2.5rem,7vh,5rem)] flex items-baseline justify-between">
          <h2 className="t-eyebrow">11 — CONTACT</h2>
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-accent">Qh7#</span>
        </div>

          <h3 className="mb-[clamp(1.5rem,4vh,3rem)] max-w-[min(100%,22rem)]">
            <LineReveal
              lines={["YOUR MOVE.", "CHECKMATE."]}
              className="t-display-1"
              lineClassName="block"
              step={160}
            />
          </h3>

        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal delay={350}>
            <p className="t-body mb-8 max-w-[42ch]">
              Internships, security work, collaborations, or a strong game of
              chess — the board is open.
            </p>

            <a
              href={`mailto:${profile.socials.email}`}
              data-cursor-label="MAIL"
              className="link-underline break-words font-display text-[clamp(1.4rem,3.4vw,2.8rem)] text-accent"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {profile.socials.email}
            </a>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-move"
                data-cursor-label="GH"
              >
                GITHUB <span className="arrow text-accent">↗</span>
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-move"
                data-cursor-label="IN"
              >
                LINKEDIN <span className="arrow text-accent">↗</span>
              </a>
              <a href={profile.socials.cv} className="btn-move" data-cursor-label="CV">
                CURRICULUM VITAE <span className="arrow text-accent">→</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={450}>
            <div className="border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="t-meta mb-4 text-ivory-3">DIRECT</div>
              <a
                href={`tel:${profile.socials.phone.replace(/\s/g, "")}`}
                className="link-underline block text-[1.05rem] text-ivory"
              >
                {profile.socials.phone}
              </a>
              <div className="t-meta mt-5">{profile.location.toUpperCase()}</div>
              <div className="t-meta mt-1 text-ivory-3">
                {profile.university.toUpperCase()} · {profile.years}
              </div>
              <div className="mt-6 font-mono text-[0.7rem] tracking-[0.2em] text-accent">
                RESPONSE WITHIN A TEMPO
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
