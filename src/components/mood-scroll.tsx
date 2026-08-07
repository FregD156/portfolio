"use client";

import React, { useEffect } from "react";

export function MoodScrollController() {
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight <= 0) return;

          const progress = Math.min(1, Math.max(0, scrollY / totalHeight));

          // Set global attribute or CSS variables based on progress
          document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(3));

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}

export function MorphWaveDivider({ from = "hero", to = "about", className = "" }: { from?: string; to?: string; className?: string }) {
  const [wavePath, setWavePath] = React.useState("M0,60 C360,40 1080,80 1440,60 L1440,120 L0,120 Z");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const amp = 20 * Math.sin(scrollY * 0.005);
      const baseY = 60 + Math.cos(scrollY * 0.003) * 10;
      setWavePath(`M0,${baseY} C360,${baseY - amp} 1080,${baseY + amp} 1440,${baseY} L1440,120 L0,120 Z`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`section-transition relative z-10 w-full overflow-hidden leading-none ${className}`} data-from={from} data-to={to}>
      <svg className="w-full h-16 text-background fill-current" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d={wavePath} />
      </svg>
    </div>
  );
}
