"use client";

import { useCallback, useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
import type { Slide } from "@/content/home";

const AUTOPLAY_MS = 6200;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function SlideVisual({ kind }: { kind: Slide["visual"] }) {
  if (kind === "start") {
    return (
      <div className="visual visual-start" aria-hidden="true">
        <span className="prompt-cursor">›</span>
        <strong>START</strong>
        <div className="answer-stack"><i /><i /><i /></div>
      </div>
    );
  }
  if (kind === "git") {
    return (
      <div className="visual visual-git" aria-hidden="true">
        <div className="vault-door"><span>GIT</span></div>
        <div className="git-stream"><i /><i /><i /><i /></div>
      </div>
    );
  }
  if (kind === "guard") {
    return (
      <div className="visual visual-guard" aria-hidden="true">
        <div className="guard-ring"><span>!</span></div>
        <div className="guard-labels"><i>SECRET</i><i>50+ MiB</i><i>REMOTE</i></div>
      </div>
    );
  }
  if (kind === "handoff") {
    return (
      <div className="visual visual-handoff" aria-hidden="true">
        <div className="agent-orb">AI</div>
        <div className="handoff-line"><i /><i /><i /></div>
        <div className="agent-orb second">AI</div>
      </div>
    );
  }
  return (
    <div className="visual visual-memory" aria-hidden="true">
      <div className="memory-folder"><i /><i /><i /></div>
      <div className="memory-nodes"><i /><i /><i /><i /></div>
    </div>
  );
}

function isTyping(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
}

export function SlideDeck({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  // Автопрокрутка по умолчанию выключена для тех, кто попросил уменьшить движение.
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false);
  const isPlaying = userPlaying ?? !reducedMotion;

  const goTo = useCallback((index: number) => setActive((index + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [isPlaying, isHovered, slides.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || isTyping(event.target)) return;
      if (event.key === "ArrowRight") goTo(active + 1);
      if (event.key === "ArrowLeft") goTo(active - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, goTo]);

  return (
    <div className="slide-deck" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="slides" role="region" aria-roledescription="карусель" aria-label="Пять уровней Starter Kit" aria-live={isPlaying ? "off" : "polite"}>
        {slides.map((slide, index) => (
          <article
            className={`slide ${index === active ? "active" : ""}`}
            key={slide.marker}
            id={`slide-${index}`}
            role="group"
            aria-roledescription="слайд"
            aria-label={`${index + 1} из ${slides.length}: ${slide.title}`}
            aria-hidden={index !== active}
            style={{ "--slide-accent": slide.accent } as CSSProperties}
          >
            <div className="slide-copy">
              <span>{slide.marker}</span>
              <h3>{slide.title}</h3>
              <p>{slide.text}</p>
              <b>{slide.metric}</b>
            </div>
            <SlideVisual kind={slide.visual} />
          </article>
        ))}
      </div>
      <div className="slide-controls">
        <button type="button" onClick={() => goTo(active - 1)} aria-label="Предыдущий слайд">←</button>
        <div className="slide-dots" role="tablist" aria-label="Выбор слайда">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.marker}
              className={index === active ? (isPlaying && !isHovered ? "active playing" : "active") : ""}
              onClick={() => goTo(index)}
              aria-label={`Слайд ${index + 1}: ${slide.title}`}
              aria-selected={index === active}
              aria-controls={`slide-${index}`}
              role="tab"
            >
              <i />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setUserPlaying(!isPlaying)} aria-label={isPlaying ? "Остановить автопрокрутку" : "Запустить автопрокрутку"}>{isPlaying ? "Ⅱ" : "▶"}</button>
        <button type="button" onClick={() => goTo(active + 1)} aria-label="Следующий слайд">→</button>
      </div>
    </div>
  );
}
