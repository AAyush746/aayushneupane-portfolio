import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;

export const lockScroll = (locked: boolean) => {
  if (typeof document === "undefined") return;
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
};

export const scrollToId = (hash: string) => {
  const target = document.querySelector(hash);
  if (!target) return;
  if (instance && !instance.isStopped) {
    instance.scrollTo(target as HTMLElement, { offset: 0, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
};

export const scrollToTop = () => {
  if (instance) instance.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
};
