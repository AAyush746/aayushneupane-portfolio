"use client";

import { useEffect, useState, type ReactNode } from "react";
import { SmoothScroll } from "./SmoothScroll";
import { Preloader } from "./Preloader";
import { Cursor } from "./Cursor";
import { Nav } from "./Nav";
import { RouteScrollReset } from "./RouteScrollReset";
import { lockScroll } from "@/lib/lenis";

export function ExperienceShell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    lockScroll(true);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:border focus:border-accent focus:bg-ink focus:px-5 focus:py-3 focus:font-mono focus:text-[0.7rem] focus:tracking-[0.2em] focus:text-accent"
      >
        SKIP TO CONTENT
      </a>

      <SmoothScroll />
      <RouteScrollReset />
      <Preloader
        onComplete={() => {
          setReady(true);
          lockScroll(false);
        }}
      />
      <Cursor />
      <Nav ready={ready} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
    </>
  );
}
