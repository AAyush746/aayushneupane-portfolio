"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToTop } from "@/lib/lenis";

/**
 * App Router does not reset scroll when only searchParams/hash-adjacent state
 * changes, and Lenis owns the scroll position — so reset explicitly on
 * navigation. Deferred one frame so the new route has committed first.
 */
export function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const id = window.requestAnimationFrame(() => scrollToTop());
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
