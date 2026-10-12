"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  /** Seconds before the reveal starts (for staggering a row of cards). */
  delay?: number;
  className?: string;
  /** Slide distance before reveal; "0" fades in place. */
  offsetY?: string;
  as?: "div" | "li" | "article";
}

/**
 * Reveals its children once they scroll into view. Content is visible
 * without JavaScript and for reduced-motion users (see .reveal in
 * globals.css); it is only hidden after hydration, below the fold.
 */
export default function FadeIn({
  children,
  delay = 0,
  className = "",
  offsetY = "1.5rem",
  as: Tag = "div",
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already on screen at load: never hide it (no flash).
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = {
    "--reveal-offset": offsetY,
    transitionDelay: state === "shown" ? `${delay}s` : undefined,
  } as CSSProperties;

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      data-state={state === "hidden" ? "hidden" : undefined}
      style={style}
    >
      {children}
    </Tag>
  );
}
