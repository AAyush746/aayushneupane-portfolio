"use client";

import { useMemo, useSyncExternalStore } from "react";

function subscribe(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

/**
 * SSR-safe media query subscription. `useSyncExternalStore` keeps this out of
 * `useEffect`, so hydration never triggers a cascading state update.
 */
export function useMediaQuery(query: string): boolean {
  const sub = useMemo(() => subscribe(query), [query]);
  const getSnapshot = useMemo(() => () => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(sub, getSnapshot, () => false);
}

export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const useFinePointer = () => useMediaQuery("(pointer: fine)");

export const useDesktopLayout = () =>
  useMediaQuery("(min-width: 1024px) and (pointer: fine)");
