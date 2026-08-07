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

      // Sky Gradient - Fresh Summer Ocean Sky to Sunset transition
      const drift = Math.sin(time * 0.02) * 0.02;
      const g = skyCtx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#083344");
      g.addColorStop(0.35 + drift, "#0284C7");
      g.addColorStop(0.65 + drift, "#FF7E5F");
      g.addColorStop(1, "#FFD166");
      skyCtx.fillStyle = g;
      skyCtx.fillRect(0, 0, w, h);

      // God Rays
      if (enabled.godRays) {
        const sunX = w * sunState.x;
        const sunY = h * sunState.y + sunState.scrollOffset;
        for (let i = 0; i < 6; i++) {
          const angle = -Math.PI / 2 + (i - 2.5) * 0.14;
          const len = h * 0.95;
          const alpha = 0.06 + Math.abs(Math.sin(time * 0.5 + i)) * 0.05;
          const grad = skyCtx.createLinearGradient(sunX, sunY, sunX + Math.cos(angle) * len, sunY + Math.sin(angle) * len + len);
          grad.addColorStop(0, `rgba(255,243,196,${alpha})`);
          grad.addColorStop(1, "rgba(255,243,196,0)");
          skyCtx.fillStyle = grad;
          skyCtx.save();
          skyCtx.translate(sunX, sunY);
          skyCtx.rotate(angle);
          skyCtx.beginPath();
          skyCtx.moveTo(0, 0);
          skyCtx.lineTo(-16, len);
          skyCtx.lineTo(16, len);
          skyCtx.closePath();
          skyCtx.fill();
          skyCtx.restore();
        }
      }

      // Sun Glow & Core
      const cx = w * sunState.x;
      const cy = h * sunState.y + sunState.scrollOffset;
      const r = h * sunState.r;

      const glow = skyCtx.createRadialGradient(cx, cy, 0, cx, cy, r * 3.5);
      glow.addColorStop(0, "rgba(255,209,102,0.45)");
      glow.addColorStop(1, "rgba(255,209,102,0)");
      skyCtx.fillStyle = glow;
      skyCtx.beginPath();
      skyCtx.arc(cx, cy, r * 3.5, 0, Math.PI * 2);
      skyCtx.fill();

      const core = skyCtx.createRadialGradient(cx, cy, 0, cx, cy, r);
      core.addColorStop(0, "#FFFFFF");
      core.addColorStop(1, "#FFD166");
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
          skyCtx.fillStyle = `rgba(255,255,255,${layer.alpha})`;
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

          skyCtx.strokeStyle = "rgba(255,255,255,0.75)";
          skyCtx.lineWidth = 1.8 * g.scale;
          skyCtx.lineCap = "round";
          skyCtx.beginPath();
          skyCtx.moveTo(px - 10 * g.scale, py + wing);
          skyCtx.quadraticCurveTo(px - 4 * g.scale, py - wing, px, py);
          skyCtx.quadraticCurveTo(px + 4 * g.scale, py - wing, px + 10 * g.scale, py + wing);
          skyCtx.stroke();
        });
      }

      // Kite
      if (enabled.kite) {
        const kx = w * 0.15 + Math.sin(time * 0.4) * 20;
        const ky = h * 0.2 + Math.cos(time * 0.3) * 14;
        skyCtx.save();
        skyCtx.translate(kx, ky);
        skyCtx.rotate(Math.sin(time * 0.4) * 0.15);
        skyCtx.fillStyle = "rgba(255,126,95,0.9)";
        skyCtx.beginPath();
        skyCtx.moveTo(0, -16);
        skyCtx.lineTo(14, 0);
        skyCtx.lineTo(0, 16);
        skyCtx.lineTo(-14, 0);
        skyCtx.closePath();
        skyCtx.fill();
        skyCtx.strokeStyle = "rgba(255,255,255,0.8)";
        skyCtx.lineWidth = 1;
        skyCtx.beginPath();
        skyCtx.moveTo(-14, 0);
        skyCtx.lineTo(14, 0);
        skyCtx.moveTo(0, -16);
        skyCtx.lineTo(0, 16);
        skyCtx.stroke();
        skyCtx.strokeStyle = "rgba(255,209,102,0.8)";
        skyCtx.beginPath();
        skyCtx.moveTo(0, 16);
        for (let i = 1; i <= 4; i++) {
          skyCtx.lineTo(Math.sin(time * 2 + i) * 6, 16 + i * 10);
        }
        skyCtx.stroke();
        skyCtx.restore();
      }

      // Falling Petals
      if (enabled.petals) {
        petals.forEach((p) => {
          p.y += p.speed;
          p.x += Math.sin(time * 0.6 + p.drift) * 0.6;
          p.rot += p.rotSpeed;
          if (p.y > h + 10) {
            p.y = -10;
            p.x = Math.random() * w;
          }
          skyCtx.save();
          skyCtx.translate(p.x, p.y);
          skyCtx.rotate(p.rot);
          skyCtx.fillStyle = "rgba(255,182,193,0.8)";
          skyCtx.beginPath();
          skyCtx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          skyCtx.fill();
          skyCtx.restore();
        });
      }
    };

    const drawWaves = (w: number, h: number, time: number) => {
      wavesCtx.clearRect(0, 0, w, h);
      const step = isMobile ? 8 : 4;

      // Render 4 wave layers with vibrant ocean colors
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

      // Front Wave Foam
      const frontLayer = waveLayers[3];
      wavesCtx.beginPath();
      for (let x = 0; x <= w; x += step) {
        const y = h * frontLayer.baseY + waveY(x, time, frontLayer);
        x === 0 ? wavesCtx.moveTo(x, y) : wavesCtx.lineTo(x, y);
      }
      wavesCtx.strokeStyle = `rgba(255,255,255,${0.65 + Math.sin(time * 1.5) * 0.25})`;
      wavesCtx.lineWidth = 3;
      wavesCtx.stroke();

      // Sailboats on Wave Surface
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
          wavesCtx.fillStyle = "rgba(255,126,95,0.95)";
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
        wavesCtx.fillStyle = `rgba(255,255,255,${alpha * 0.9})`;
        wavesCtx.beginPath();
        wavesCtx.arc(p.x, h * p.yFactor, p.size * 1.2, 0, Math.PI * 2);
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

      {/* Swaying Coconut Palm Tree Leaf Shadow */}
      <svg className="palm-shadow" viewBox="0 0 300 300" aria-hidden="true">
        <g fill="rgba(6,182,212,0.55)">
          <path d="M20,300 C20,180 60,120 90,60 C70,110 40,160 20,300 Z" />
          <path d="M20,300 C40,190 90,140 150,90 C100,130 50,180 20,300 Z" />
          <path d="M20,300 C60,200 130,160 190,130 C130,160 70,210 20,300 Z" />
        </g>
      </svg>

      {/* Hero Overlay Content */}
      <div className="hero-content max-w-6xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center py-24">
        {/* Left Column Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left"
        >
          {/* Headline in Fraunces */}
          <h1 className="font-fraunces text-4xl md:text-5xl lg:text-[3.6rem] font-bold leading-[1.08] text-white tracking-tight mb-5 drop-shadow-lg">
            Architecting <span className="italic font-normal text-[#2DD4BF]">Intelligent</span> Systems & AI Pipelines.
          </h1>

          {/* Subtext in Plus Jakarta Sans */}
          <p className="font-jakarta text-base md:text-lg text-teal-100/90 leading-relaxed max-w-[42ch] mb-8 font-medium drop-shadow-sm">
            Student developer at UTT (3.64 GPA). 3rd Place Team Leader at AI for Social Challenge. Building high-performance backends and temporal Graph-RAG architectures.
          </p>

          {/* Action CTAs */}
          <div className="flex gap-4 flex-wrap mb-10">
            <a
              href="#projects"
              className="font-jakarta inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#2DD4BF] hover:from-[#0284c7] hover:to-[#14b8a6] text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Selected Work <OceanIcon name="wave" className="w-5 h-5 text-white" />
            </a>
            <a
              href="#contact"
              className="font-jakarta inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-teal-300/40 bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md transition-all duration-300"
            >
              Get in Touch <OceanIcon name="compass" className="w-5 h-5 text-[#2DD4BF]" />
            </a>
          </div>

          {/* Social Links with Thin SVG Icons */}
          <div className="flex gap-3 items-center text-white/90">
            <a
              href={portfolioConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-teal-300/30 bg-white/10 hover:bg-white/25 text-white transition-all duration-200 hover:scale-105"
              aria-label="GitHub"
            >
              <OceanIcon name="github" className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${portfolioConfig.email}`}
              className="p-2.5 rounded-xl border border-teal-300/30 bg-white/10 hover:bg-white/25 text-white transition-all duration-200 hover:scale-105"
              aria-label="Email"
            >
              <OceanIcon name="mail" className="w-5 h-5" />
            </a>
            <a
              href={portfolioConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-teal-300/30 bg-white/10 hover:bg-white/25 text-white transition-all duration-200 hover:scale-105"
              aria-label="Resume"
            >
              <OceanIcon name="terminal" className="w-5 h-5" />
            </a>
            <div className="w-px h-5 bg-white/30 mx-1" />
            <span className="postmark text-xs text-[#2DD4BF] font-bold">HANOI, VN</span>
          </div>
        </motion.div>

        {/* Right Column Profile Showcase: Ocean Expedition Compass & Helm Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center items-center relative"
        >
          <Tilt
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            perspective={1000}
            transitionSpeed={1200}
            gyroscope={true}
            className="relative flex items-center justify-center p-6"
          >
            {/* 1. Animated Outer Rotating Compass Navigation Dial */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-[390px] h-[390px] text-[#2DD4BF]/40 spin-slow" viewBox="0 0 400 400" fill="none">
                <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" />
                <circle cx="200" cy="200" r="175" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                {/* Compass Markers N, S, E, W */}
                <text x="195" y="24" fill="currentColor" fontSize="11" fontWeight="bold" fontFamily="monospace">N</text>
                <text x="380" y="204" fill="currentColor" fontSize="11" fontWeight="bold" fontFamily="monospace">E</text>
                <text x="195" y="390" fill="currentColor" fontSize="11" fontWeight="bold" fontFamily="monospace">S</text>
                <text x="12" y="204" fill="currentColor" fontSize="11" fontWeight="bold" fontFamily="monospace">W</text>
              </svg>
            </div>

            {/* 2. Pulsating Water Ripple Rings */}
            <div className="absolute inset-4 rounded-full border border-[#06B6D4]/30 animate-pulse pointer-events-none" />
            <div className="absolute -inset-2 rounded-full border border-[#2DD4BF]/20 pointer-events-none" />

            {/* 3. Central Ocean Helm Portrait Window */}
            <div className="relative w-[290px] h-[290px] md:w-[330px] md:h-[330px] rounded-full p-2.5 bg-gradient-to-tr from-[#06B6D4] via-[#2DD4BF] to-[#38BDF8] shadow-[0_0_50px_rgba(6,182,212,0.35)] group">
              
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/60 bg-[#032b3d]">
                <Image
                  src="/assets/images/profile.jpeg"
                  alt="Nguyen Thanh Duy - Software Engineer"
                  fill
                  sizes="(max-width: 768px) 290px, 330px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                
                {/* Sunlit Ocean Shimmer Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#032b3d] via-transparent to-transparent opacity-85 group-hover:opacity-75 transition-opacity duration-500" />

                {/* Integrated Name & Role Banner at Center-Bottom of Ring */}
                <div className="absolute bottom-6 left-0 right-0 text-center px-4 text-white">
                  <div className="font-fraunces text-xl font-bold tracking-tight text-white drop-shadow-md">
                    Nguyen Thanh Duy
                  </div>
                  <div className="postmark text-[11px] text-[#2DD4BF] font-extrabold tracking-widest mt-0.5 flex items-center justify-center gap-1.5">
                    <OceanIcon name="wave" className="w-3.5 h-3.5 text-[#2DD4BF]" />
                    SOFTWARE ENGINEER · UTT
                  </div>
                </div>
              </div>

            </div>

            {/* 4. Floating Nautical Compass Badges */}
            {/* Top-Right Badge: GPA 3.64 */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="absolute -right-2 md:-right-6 top-8 bg-[#042d3e]/95 border border-[#2DD4BF]/50 rounded-2xl px-4 py-2.5 shadow-2xl backdrop-blur-xl text-white flex items-center gap-3 z-20"
            >
              <div className="p-2 rounded-xl bg-[#06B6D4]/20 text-[#2DD4BF]">
                <OceanIcon name="compass" className="w-5 h-5" />
              </div>
              <div>
                <div className="postmark text-[9px] text-[#2DD4BF] font-bold">ACADEMIC EXCELLENCE</div>
                <div className="font-fraunces text-lg font-extrabold text-white leading-none my-0.5">3.64 GPA</div>
                <div className="postmark text-[9px] text-teal-100/70">UTT · EXCELLENT</div>
              </div>
            </motion.div>

            {/* Bottom-Left Badge: 3rd Place Award */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="absolute -left-2 md:-left-6 bottom-8 bg-[#042d3e]/95 border border-[#2DD4BF]/50 rounded-2xl px-4 py-2.5 shadow-2xl backdrop-blur-xl text-white flex items-center gap-3 z-20"
            >
              <div className="p-2 rounded-xl bg-[#06B6D4]/20 text-[#2DD4BF]">
                <OceanIcon name="trophy" className="w-5 h-5" />
              </div>
              <div>
                <div className="postmark text-[9px] text-[#2DD4BF] font-bold">AI INNOVATION AWARD</div>
                <div className="font-fraunces text-sm font-extrabold text-white leading-none my-0.5">3rd Place Winner</div>
                <div className="postmark text-[9px] text-teal-100/70">AI FOR SOCIAL CHALLENGE</div>
              </div>
            </motion.div>

          </Tilt>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70 z-10">
        <span className="postmark text-[10px] tracking-[0.2em]">SCROLL TO EXPLORE</span>
        <OceanIcon name="wave" className="w-4 h-4 animate-bounce text-[#FFE3A3]" />
      </div>
    </section>
  );
}
