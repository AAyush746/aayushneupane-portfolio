"use client";

import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { lockScroll, scrollToId } from "@/lib/lenis";

export function Nav({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    lockScroll(open);
    if (open) {
      const first = menuRef.current?.querySelector<HTMLElement>("button, a");
      first?.focus();
    } else if (document.activeElement && menuRef.current?.contains(document.activeElement)) {
      toggleRef.current?.focus();
    }
  }, [open]);

  // Keep Tab inside the open dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusables = menuRef.current.querySelectorAll<HTMLElement>("button, a[href]");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !menuRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (hash: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(hash), open ? 450 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          ready ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="shell flex items-center justify-between py-6">
          <button
            onClick={() => go("#opening")}
            className="font-mono text-[0.7rem] tracking-[0.28em] text-ivory transition-colors hover:text-accent"
            data-cursor-label="A1"
          >
            AAYUSH<span className="text-accent">.</span>
          </button>

          <div className="flex items-center gap-6">
            <span className="hidden font-mono text-[0.65rem] tracking-[0.22em] text-ivory-3 sm:block">
              {profile.location.toUpperCase()}
            </span>
            <button
              ref={toggleRef}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="group flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.28em] text-ivory transition-colors hover:text-accent"
            >
              <span className="flex h-[10px] w-4 flex-col justify-between">
                <span
                  className={`h-px w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    open ? "translate-y-[4.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-px w-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    open ? "-translate-y-[4.5px] -rotate-45" : ""
                  }`}
                />
              </span>
              {open ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
        <div className="shell">
          <div
            className={`h-px w-full bg-line transition-opacity duration-700 ${
              ready && !open ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </header>

      {/* Fullscreen menu */}
      <div
        id="site-menu"
        ref={menuRef}
        role="dialog"
        aria-modal={open}
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-[90] bg-ink transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
        }}
      >
        <div className="shell flex h-full flex-col justify-between py-8">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.7rem] tracking-[0.28em] text-ivory">
              MENU
            </span>
            <span className="t-meta text-ivory-3">SELECT A SQUARE</span>
          </div>

          <nav className="flex flex-col">
            {navigation.map((item, i) => (
              <button
                key={item.id}
                onClick={() => go(`#${item.id}`)}
                className="group flex items-baseline justify-between gap-6 border-b border-line py-[clamp(0.6rem,1.8vh,1.1rem)] text-left transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-4"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(32px)",
                  transition: `opacity .7s var(--ease-out-expo) ${i * 70 + 150}ms, transform .7s var(--ease-out-expo) ${
                    i * 70 + 150
                  }ms, padding .5s var(--ease-out-expo)`,
                }}
              >
                <span className="flex items-baseline gap-4 sm:gap-8">
                  <span className="font-mono text-[0.65rem] tracking-[0.2em] text-ivory-3 transition-colors group-hover:text-accent">
                    {item.index}
                  </span>
                  <span className="t-display-2 !leading-[1] transition-colors duration-300 group-hover:text-accent min-w-0">
                    {item.label}
                  </span>
                </span>
                <span className="font-mono text-[0.7rem] tracking-[0.2em] text-ivory-3 transition-colors duration-300 group-hover:text-accent">
                  {item.square}
                </span>
              </button>
            ))}
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-6">
              <a
                href={`mailto:${profile.socials.email}`}
                className="t-meta link-underline hover:text-accent"
              >
                {profile.socials.email}
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="t-meta link-underline hover:text-accent"
              >
                GITHUB
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="t-meta link-underline hover:text-accent"
              >
                LINKEDIN
              </a>
            </div>
            <span className="t-meta text-ivory-3">{profile.tagline.join(" ")}</span>
          </div>
        </div>
      </div>
    </>
  );
}
