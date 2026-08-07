"use client";

import React, { useEffect, useState } from "react";

export function SplashIntro() {
  const [leaving, setLeaving] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      requestAnimationFrame(() => {
        setLeaving(true);
        setTimeout(() => setRemoved(true), 1300);
      });
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      // Fallback timer if load takes too long
      const timer = setTimeout(handleLoad, 800);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  if (removed) return null;

  return (
    <div
      className={`splash fixed inset-0 z-[200] bg-[#12B8A6] flex flex-col items-center justify-center pointer-events-none transition-transform duration-1000 cubic-bezier-[0.76,0,0.24,1] ${
        leaving ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex flex-col items-center gap-3 text-white">
        <svg className="w-12 h-12 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M2 15c2 0 2-3 4-3s2 3 4 3 2-3 4-3 2 3 4 3 2-3 4-3" strokeLinecap="round" />
          <path d="M2 19c2 0 2-3 4-3s2 3 4 3 2-3 4-3 2 3 4 3 2-3 4-3" strokeLinecap="round" opacity="0.5" />
        </svg>
        <span className="font-mono text-sm uppercase tracking-[0.25em]">Nguyen Thanh Duy · Portfolio</span>
      </div>
    </div>
  );
}
