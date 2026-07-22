"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Vertical slide distance before reveal. Use 0 to fade in place (e.g. hero columns). */
  offsetY?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  className = "",
  offsetY = "2.5rem",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const slide = offsetY !== "0" && offsetY !== "0px" && offsetY !== "0rem";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: slide
          ? visible
            ? "translateY(0)"
            : `translateY(${offsetY})`
          : undefined,
        transition: slide
          ? `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
          : `opacity 0.7s ease ${delay}s`,
        willChange: visible ? undefined : slide ? "opacity, transform" : "opacity",
      }}
    >
      {children}
    </div>
  );
}
