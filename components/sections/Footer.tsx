"use client";

import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { scrollToId } from "@/lib/lenis";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-ink-2">
      <div className="shell py-[clamp(3rem,8vh,5rem)]">
        <div className="grid gap-10 border-b border-line pb-[clamp(2rem,6vh,4rem)] sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[1.6rem] leading-none text-accent">♞</span>
              <span className="font-mono text-[0.75rem] tracking-[0.3em] text-ivory">
                AAYUSH NEUPANE
              </span>
            </div>
            <p className="t-meta mt-4 max-w-[30ch] !normal-case !tracking-normal !text-ivory-3">
              {profile.roleLine}
            </p>
          </div>

          <nav aria-label="Sections">
            <div className="t-eyebrow mb-4">SQUARES</div>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToId(`#${item.id}`)}
                    className="group flex items-baseline gap-3 text-[0.85rem] text-ivory-2 transition-colors hover:text-accent"
                  >
                    <span className="font-mono text-[0.6rem] tracking-[0.2em] text-ivory-3 group-hover:text-accent">
                      {item.square}
                    </span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere">
            <div className="t-eyebrow mb-4">ELSEWHERE</div>
            <ul className="space-y-2 text-[0.85rem]">
              {[
                { label: "Email", href: `mailto:${profile.socials.email}` },
                { label: "GitHub", href: profile.socials.github },
                { label: "LinkedIn", href: profile.socials.linkedin },
                { label: "Curriculum Vitae", href: profile.socials.cv },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="link-underline text-ivory-2 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="t-eyebrow mb-4">FINAL NOTATION</div>
            <p className="font-mono text-[0.8rem] leading-relaxed tracking-[0.14em] text-ivory-2">
              1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6
            </p>
            <p className="t-meta mt-3 text-ivory-3">THE Sicilian — WORK CONTINUES</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-[clamp(1.5rem,4vh,2.5rem)]">
          <div>
            <div className="t-display-3 !text-[clamp(1rem,1.6vw,1.35rem)] !tracking-[0.2em]">
              {profile.footerNote}
            </div>
            <button
              onClick={() => scrollToId("#opening")}
              className="btn-move mt-4"
              data-cursor-label="A1"
            >
              NEW GAME <span className="arrow text-accent">↺</span>
            </button>
          </div>

          <div className="text-right">
            <div className="t-meta text-ivory-3">
              © {year} {profile.name.toUpperCase()}
            </div>
            <div className="t-meta mt-1 text-ivory-3">
              BUILT WITH NEXT.JS · THREE.JS · GSAP
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
