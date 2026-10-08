"use client";

import { useEffect, useRef } from "react";

// Полоса прогресса прокрутки. Обновляет стиль напрямую, без перерисовки React.
// В браузерах с поддержкой scroll-driven animations работает чистый CSS (см. globals.css).
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (CSS.supports("animation-timeline: scroll()")) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.current?.style.setProperty("transform", `scaleX(${progress})`);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div ref={bar} className="scroll-progress" aria-hidden="true" />;
}
