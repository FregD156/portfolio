"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { OceanIcon } from "@/components/ui/ocean-icons";
import { portfolioConfig } from "@/lib/config";

// --- Sky & Sun parameters ---
const sunState = { x: 0.72, y: 0.28, r: 0.09, scrollOffset: 0 };

const cloudLayers = [
  { count: 3, speed: 0.15, alpha: 0.35, scale: 1.4, y: 0.18 },
  { count: 2, speed: 0.35, alpha: 0.55, scale: 1.0, y: 0.30 },
];

const waveLayers = [
  { baseY: 0.55, color: "15,110,86",   alpha: 0.35, freq1: 0.004, freq2: 0.011, freq3: 0.002, amp1: 10, amp2: 5, amp3: 14, speed1: 0.6, speed2: 1.1, speed3: 0.3 },
  { baseY: 0.65, color: "18,184,166",  alpha: 0.50, freq1: 0.005, freq2: 0.013, freq3: 0.003, amp1: 14, amp2: 7, amp3: 18, speed1: 0.8, speed2: 1.4, speed3: 0.4 },
  { baseY: 0.78, color: "79,216,196",  alpha: 0.70, freq1: 0.006, freq2: 0.016, freq3: 0.004, amp1: 18, amp2: 9, amp3: 22, speed1: 1.0, speed2: 1.8, speed3: 0.5 },
  { baseY: 0.90, color: "234,251,247", alpha: 0.90, freq1: 0.007, freq2: 0.02,  freq3: 0.005, amp1: 10, amp2: 6, amp3: 12, speed1: 1.3, speed2: 2.2, speed3: 0.6 },
];

function waveY(x: number, t: number, layer: (typeof waveLayers)[0]) {
  return (
    Math.sin(x * layer.freq1 + t * layer.speed1) * layer.amp1 +
    Math.sin(x * layer.freq2 + t * layer.speed2) * layer.amp2 +
    Math.sin(x * layer.freq3 * 0.5 + t * layer.speed3 * 0.7) * layer.amp3 * 0.5
  );
}

// Precomputed Titanium Rivets coordinates for 100% stable SSR hydration
const titaniumRivets = Array.from({ length: 12 }).map((_, i) => {
  const angle = (i * 30 * Math.PI) / 180;
  const radius = 48;
  return {
    id: i,
    left: `${Number((50 + radius * Math.cos(angle)).toFixed(2))}%`,
    top: `${Number((50 + radius * Math.sin(angle)).toFixed(2))}%`,
  };
});

export function HeroOcean() {
  const skyCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const wavesCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const skyCanvas = skyCanvasRef.current;
    const wavesCanvas = wavesCanvasRef.current;
    if (!skyCanvas || !wavesCanvas) return;

    const skyCtx = skyCanvas.getContext("2d");
    const wavesCtx = wavesCanvas.getContext("2d");
    if (!skyCtx || !wavesCtx) return;

    let animationFrameId: number;
    let t = 0;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 640;
    const tier = window.innerWidth < 640 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop";

    const enabled = {
      gulls: tier !== "mobile",
      boats: true,
      lanterns: tier === "desktop",
      kite: tier !== "mobile",
      petals: tier !== "mobile",
      godRays: tier === "desktop",
      ripples: tier === "desktop" && window.matchMedia("(pointer: fine)").matches,
    };

    // Responsive canvas scaling
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      [skyCanvas, wavesCanvas].forEach((c) => {
        c.width = c.clientWidth * dpr;
        c.height = c.clientHeight * dpr;
        const ctx = c.getContext("2d");
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Scroll effect for sun
    const handleScroll = () => {
      const heroEl = document.querySelector(".ocean-hero") as HTMLElement;
      if (!heroEl) return;
      const progress = Math.min(1, Math.max(0, -heroEl.getBoundingClientRect().top / heroEl.offsetHeight));
      sunState.scrollOffset = progress * heroEl.offsetHeight * 0.4;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Summer particles
    const gulls = Array.from({ length: 4 }, () => ({
      x: Math.random(),
      y: 0.12 + Math.random() * 0.15,
      speed: 0.04 + Math.random() * 0.03,
      flapOffset: Math.random() * Math.PI * 2,
      scale: 0.7 + Math.random() * 0.6,
    }));

    const boats = [
      { xFactor: 0.22, drift: 0.15, bob: 1.2, scale: 1 },
      { xFactor: 0.68, drift: -0.1, bob: 1.5, scale: 0.75 },
    ];

    const sparkles = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      yFactor: 0.6 + Math.random() * 0.25,
      size: 1 + Math.random() * 1.5,
      speed: 0.5 + Math.random() * 1.5,
      offset: Math.random() * Math.PI * 2,
    }));

    const petals = Array.from({ length: 10 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * -window.innerHeight,
      speed: 0.4 + Math.random() * 0.6,
      drift: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      size: 4 + Math.random() * 4,
    }));

    const ripples: { x: number; y: number; r: number; alpha: number }[] = [];
    const handleMouseMove = (e: MouseEvent) => {
      if (!enabled.ripples) return;
      if (Math.random() > 0.82) {
        const rect = wavesCanvas.getBoundingClientRect();
        ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, r: 0, alpha: 0.5 });
      }
    };
    wavesCanvas.addEventListener("mousemove", handleMouseMove);

    // --- Drawing Functions ---
    const drawSky = (w: number, h: number, time: number) => {
      skyCtx.clearRect(0, 0, w, h);

      // Sky Gradient - Bright Clear Blue Summer Sky
      const drift = Math.sin(time * 0.02) * 0.02;
      const g = skyCtx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#0284C7");
      g.addColorStop(0.4 + drift, "#38BDF8");
      g.addColorStop(0.75 + drift, "#7DD3FC");
      g.addColorStop(1, "#E0F2FE");
      skyCtx.fillStyle = g;
      skyCtx.fillRect(0, 0, w, h);

      // Sun Glow & Core
      const cx = w * sunState.x;
      const cy = h * sunState.y + sunState.scrollOffset;
      const r = h * sunState.r;

      const glow = skyCtx.createRadialGradient(cx, cy, 0, cx, cy, r * 3.5);
      glow.addColorStop(0, "rgba(254, 240, 138, 0.6)");
      glow.addColorStop(1, "rgba(254, 240, 138, 0)");
      skyCtx.fillStyle = glow;
      skyCtx.beginPath();
      skyCtx.arc(cx, cy, r * 3.5, 0, Math.PI * 2);
      skyCtx.fill();

      const core = skyCtx.createRadialGradient(cx, cy, 0, cx, cy, r);
      core.addColorStop(0, "#FFFFFF");
      core.addColorStop(1, "#FEF08A");
      skyCtx.fillStyle = core;
      skyCtx.beginPath();
      skyCtx.arc(cx, cy, r, 0, Math.PI * 2);
      skyCtx.fill();

      // Parallax Clouds
      cloudLayers.forEach((layer) => {
        for (let i = 0; i < layer.count; i++) {
          const spread = w / layer.count;
          const x = (((i * spread + time * layer.speed * 20) % (w + spread * layer.scale)) - spread * layer.scale);
          const y = h * layer.y + Math.sin(time * 0.1 + i) * 6;
          const size = layer.scale * 60;
          skyCtx.fillStyle = `rgba(255,255,255,${layer.alpha * 0.9})`;
          [[0, 0, 1], [size * 0.6, -size * 0.15, 0.8], [-size * 0.6, -size * 0.1, 0.7], [size * 0.3, size * 0.1, 0.9]].forEach(
            ([dx, dy, s]) => {
              skyCtx.beginPath();
              skyCtx.ellipse(x + dx, y + dy, size * s * 0.5, size * s * 0.32, 0, 0, Math.PI * 2);
              skyCtx.fill();
            }
          );
        }
      });

      // Seagulls
      if (enabled.gulls) {
        gulls.forEach((g) => {
          g.x = (g.x + g.speed * 0.001) % 1.15;
          const px = g.x * w - 0.1 * w;
          const py = g.y * h + Math.sin(time * 0.3 + g.flapOffset) * 8;
          const wing = Math.sin(time * 6 + g.flapOffset) * 6 * g.scale;

          skyCtx.strokeStyle = "rgba(255,255,255,0.9)";
          skyCtx.lineWidth = 2 * g.scale;
          skyCtx.lineCap = "round";
          skyCtx.beginPath();
          skyCtx.moveTo(px - 10 * g.scale, py + wing);
          skyCtx.quadraticCurveTo(px - 4 * g.scale, py - wing, px, py);
          skyCtx.quadraticCurveTo(px + 4 * g.scale, py - wing, px + 10 * g.scale, py + wing);
          skyCtx.stroke();
        });
      }
    };

    const drawWaves = (w: number, h: number, time: number) => {
      wavesCtx.clearRect(0, 0, w, h);
      const step = isMobile ? 8 : 4;

      // 1. Render 4 Wave Layers (Ocean Turquoise)
      waveLayers.forEach((layer) => {
        wavesCtx.beginPath();
        wavesCtx.moveTo(0, h);
        for (let x = 0; x <= w; x += step) {
          wavesCtx.lineTo(x, h * layer.baseY + waveY(x, time, layer));
        }
        wavesCtx.lineTo(w, h);
        wavesCtx.closePath();
        wavesCtx.fillStyle = `rgba(${layer.color},${layer.alpha})`;
        wavesCtx.fill();
      });

      // 2. Golden Beach Sand Shoreline at the Bottom of Canvas
      const sandGrad = wavesCtx.createLinearGradient(0, h * 0.88, 0, h);
      sandGrad.addColorStop(0, "rgba(254, 240, 138, 0)");
      sandGrad.addColorStop(0.3, "rgba(254, 240, 138, 0.45)");
      sandGrad.addColorStop(1, "rgba(253, 224, 71, 0.85)");
      wavesCtx.fillStyle = sandGrad;
      wavesCtx.beginPath();
      wavesCtx.moveTo(0, h);
      for (let x = 0; x <= w; x += step) {
        wavesCtx.lineTo(x, h * 0.88 + Math.sin(x * 0.005 + time * 0.4) * 8);
      }
      wavesCtx.lineTo(w, h);
      wavesCtx.closePath();
      wavesCtx.fill();

      // Front Wave Foam Border
      const frontLayer = waveLayers[3];
      wavesCtx.beginPath();
      for (let x = 0; x <= w; x += step) {
        const y = h * frontLayer.baseY + waveY(x, time, frontLayer);
        x === 0 ? wavesCtx.moveTo(x, y) : wavesCtx.lineTo(x, y);
      }
      wavesCtx.strokeStyle = `rgba(255,255,255,${0.7 + Math.sin(time * 1.5) * 0.2})`;
      wavesCtx.lineWidth = 3;
      wavesCtx.stroke();

      // Sailboats / Yachts on Wave Surface
      if (enabled.boats) {
        boats.forEach((b) => {
          const x = ((b.xFactor * w + time * b.drift * 10) % (w + 60)) - 30;
          const y = h * frontLayer.baseY + waveY(x, time, frontLayer) - 6 + Math.sin(time * b.bob) * 3;
          wavesCtx.save();
          wavesCtx.translate(x, y);
          wavesCtx.scale(b.scale, b.scale);
          wavesCtx.fillStyle = "rgba(255,255,255,0.95)";
          wavesCtx.beginPath();
          wavesCtx.moveTo(-14, 0);
          wavesCtx.lineTo(14, 0);
          wavesCtx.lineTo(9, 8);
          wavesCtx.lineTo(-9, 8);
          wavesCtx.closePath();
          wavesCtx.fill();
          wavesCtx.fillStyle = "rgba(6,182,212,0.95)";
          wavesCtx.beginPath();
          wavesCtx.moveTo(0, 0);
          wavesCtx.lineTo(0, -20);
          wavesCtx.lineTo(12, 0);
          wavesCtx.closePath();
          wavesCtx.fill();
          wavesCtx.restore();
        });
      }

      // Sparkles
      sparkles.forEach((p) => {
        const alpha = Math.abs(Math.sin(time * p.speed + p.offset));
        wavesCtx.fillStyle = `rgba(255,255,255,${alpha * 0.95})`;
        wavesCtx.beginPath();
        wavesCtx.arc(p.x, h * p.yFactor, p.size * 1.3, 0, Math.PI * 2);
        wavesCtx.fill();
      });

      // Pointer Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += 1.2;
        r.alpha -= 0.012;
        if (r.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        wavesCtx.strokeStyle = `rgba(255,255,255,${r.alpha})`;
        wavesCtx.lineWidth = 1.5;
        wavesCtx.beginPath();
        wavesCtx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        wavesCtx.stroke();
      }
    };

    const renderLoop = () => {
      t += 0.016;
      const w = skyCanvas.clientWidth;
      const h = skyCanvas.clientHeight;
      drawSky(w, h, t);
      drawWaves(w, h, t);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    if (reduceMotion) {
      const w = skyCanvas.clientWidth;
      const h = skyCanvas.clientHeight;
      drawSky(w, h, 0);
      drawWaves(w, h, 0);
    } else {
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      wavesCanvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="ocean-hero min-h-[100dvh] flex items-center justify-center relative overflow-hidden" id="hero">
      <canvas id="sky-canvas" ref={skyCanvasRef} aria-hidden="true" className="pointer-events-none" />
      <canvas id="waves-canvas" ref={wavesCanvasRef} aria-hidden="true" className="pointer-events-none" />

      {/* Swaying Coconut Palm Tree Left Side */}
      <svg className="palm-shadow left-0 -bottom-8 w-64 md:w-80" viewBox="0 0 300 300" aria-hidden="true">
        <g fill="rgba(14,165,233,0.45)">
          <path d="M0,300 C20,180 60,120 110,50 C80,100 40,160 0,300 Z" />
          <path d="M0,300 C40,190 100,130 170,80 C110,120 50,180 0,300 Z" />
          <path d="M0,300 C60,200 140,160 210,120 C140,150 70,210 0,300 Z" />
        </g>
      </svg>

      {/* Swaying Coconut Palm Tree Right Side */}
      <svg className="palm-shadow right-0 -bottom-8 w-64 md:w-80 transform -scale-x-100" viewBox="0 0 300 300" aria-hidden="true">
        <g fill="rgba(14,165,233,0.45)">
          <path d="M0,300 C20,180 60,120 110,50 C80,100 40,160 0,300 Z" />
          <path d="M0,300 C40,190 100,130 170,80 C110,120 50,180 0,300 Z" />
          <path d="M0,300 C60,200 140,160 210,120 C140,150 70,210 0,300 Z" />
        </g>
      </svg>

      {/* Hero Overlay Content */}
      <div className="hero-content max-w-6xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-12 gap-10 items-center py-20 z-10">
        
        {/* Left Column Copy (7 cols) - Sharp Architectural Geometric Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >


          {/* Headline in Fraunces */}
          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-[3.8rem] font-extrabold leading-[1.05] text-white tracking-tight mb-3 drop-shadow-lg">
            Nguyen Thanh Duy
          </h1>

          <p className="font-fraunces text-xl md:text-2xl text-[#FDE68A] italic mb-4 drop-shadow-md">
            Software Engineer & AI Builder
          </p>

          <p className="font-jakarta text-sm md:text-base text-teal-100/90 leading-relaxed max-w-[45ch] mb-8 font-medium drop-shadow-sm">
            Engineering Graph-RAG architectures & high-performance backend systems at UTT Hanoi.
          </p>

          {/* Action CTAs - Soft Organic Liquid Pills */}
          <div className="flex gap-4 flex-wrap mb-8">
            <a
              href="#projects"
              className="font-jakarta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#06B6D4] via-[#2DD4BF] to-[#14B8A6] hover:from-[#0284c7] hover:to-[#0f766e] text-white font-extrabold text-sm shadow-xl hover:shadow-[0_10px_30px_rgba(45,212,191,0.5)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <OceanIcon name="sailboat" className="w-4 h-4 text-white" /> Selected Works
            </a>
            <a
              href="#contact"
              className="font-jakarta inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/60 bg-white/15 hover:bg-white/30 text-white font-bold backdrop-blur-xl text-sm transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-lg"
            >
              <OceanIcon name="mail" className="w-4 h-4 text-[#FDE68A]" /> Get in Touch
            </a>
          </div>

          {/* Social Links with Soft Floating Icons */}
          <div className="flex gap-3 items-center">
            <a
              href={portfolioConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/40 bg-white/15 hover:bg-white/35 text-white transition-all duration-300 hover:scale-110 hover:border-[#FDE68A] shadow-md"
              aria-label="GitHub"
            >
              <OceanIcon name="github" className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${portfolioConfig.email}`}
              className="p-3 rounded-full border border-white/40 bg-white/15 hover:bg-white/35 text-white transition-all duration-300 hover:scale-110 hover:border-[#FDE68A] shadow-md"
              aria-label="Email"
            >
              <OceanIcon name="mail" className="w-4 h-4" />
            </a>
            <a
              href={portfolioConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-white/40 bg-white/15 hover:bg-white/35 text-white transition-all duration-300 hover:scale-110 hover:border-[#FDE68A] shadow-md"
              aria-label="Resume"
            >
              <OceanIcon name="terminal" className="w-4 h-4" />
            </a>
            <div className="w-px h-4 bg-white/40 mx-1" />
            <span className="font-mono text-xs text-[#FDE68A] font-bold tracking-wider">UTT · HANOI</span>
          </div>
        </motion.div>

        {/* Right Column Profile Showcase (5 cols) - 3D Tropical Ocean Crystal Globe Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          <Tilt
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            perspective={1000}
            transitionSpeed={1200}
            gyroscope={true}
            className="relative flex flex-col items-center justify-center p-2"
          >
            {/* Swaying Tropical Palm Fronds Framing the Top of the Globe */}
            <svg className="absolute -top-10 -right-6 w-44 h-44 z-20 pointer-events-none transform rotate-12 drop-shadow-2xl" viewBox="0 0 200 200" fill="none">
              <path d="M20,180 C50,110 110,60 180,20 C150,60 110,110 90,180 Z" fill="#2DD4BF" opacity="0.9" />
              <path d="M20,180 C70,120 130,80 195,40 C160,80 120,130 90,180 Z" fill="#FDE68A" opacity="0.8" />
              <path d="M20,180 C40,130 80,90 150,50 C120,90 80,130 60,180 Z" fill="#06B6D4" opacity="0.85" />
            </svg>

            {/* 3D Tropical Ocean Crystal Globe Sphere Window */}
            <div className="relative w-[290px] h-[290px] md:w-[340px] md:h-[340px] rounded-full p-2.5 bg-gradient-to-br from-teal-300 via-teal-900 to-[#022433] border-4 border-[#2DD4BF] shadow-[0_0_50px_rgba(45,212,191,0.45)] group">
              
              {/* Inner Convex Crystal Sphere Lens (Photo Perfectly Centered) */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/90 bg-[#0284C7] shadow-inner">
                <Image
                  src="/assets/images/profile.jpeg"
                  alt="Nguyen Thanh Duy - Software Engineer"
                  fill
                  sizes="(max-width: 768px) 290px, 340px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
                  priority
                />

                {/* Tropical Sunlit Glass Lens Flare & Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 pointer-events-none group-hover:opacity-80 transition-opacity duration-500" />
              </div>

            </div>

            {/* Unified Glass Metric Showcase Bar (NO dark name label) */}
            <div className="flex flex-wrap justify-center gap-3 mt-6 z-20">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-xl border border-white/40 bg-white/10 backdrop-blur-xl text-white flex items-center gap-2.5 shadow-xl transition-all cursor-default"
              >
                <div className="w-7 h-7 rounded-lg bg-[#FDE68A] text-[#022433] flex items-center justify-center font-bold shadow-inner">
                  <OceanIcon name="star" className="w-4 h-4 text-[#022433]" />
                </div>
                <div>
                  <div className="font-mono text-[9px] text-[#FDE68A] font-bold tracking-wider uppercase">ACADEMIC GPA</div>
                  <div className="font-fraunces text-xs md:text-sm font-extrabold text-white">3.64 / 4.00</div>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-xl border border-white/40 bg-white/10 backdrop-blur-xl text-white flex items-center gap-2.5 shadow-xl transition-all cursor-default"
              >
                <div className="w-7 h-7 rounded-lg bg-[#FDE68A] text-[#022433] flex items-center justify-center font-bold shadow-inner">
                  <OceanIcon name="trophy" className="w-4 h-4 text-[#022433]" />
                </div>
                <div>
                  <div className="font-mono text-[9px] text-[#FDE68A] font-bold tracking-wider uppercase">AI INNOVATION</div>
                  <div className="font-fraunces text-xs md:text-sm font-extrabold text-white">3rd Place Award</div>
                </div>
              </motion.div>
            </div>

          </Tilt>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/90 z-10">
        <OceanIcon name="wave" className="w-5 h-5 animate-bounce text-[#FDE68A]" />
      </div>
    </section>
  );
}
