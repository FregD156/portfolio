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

    const crystalLeaves = Array.from({ length: 16 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speedY: 0.6 + Math.random() * 0.7,
      speedX: 0.3 + Math.random() * 0.6,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.025,
      scale: 0.75 + Math.random() * 0.65,
      hue: Math.random() > 0.4 ? "2DD4BF" : "10B981",
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

    // Celestial Night Progress State
    let nightProgress = window.document.documentElement.classList.contains("dark") ? 1 : 0;

    // Precompute Twinkling Night Stars
    const stars = Array.from({ length: 70 }, () => ({
      xFactor: Math.random(),
      yFactor: Math.random() * 0.6,
      size: 0.8 + Math.random() * 1.8,
      twinkleSpeed: 1 + Math.random() * 2.5,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    // --- Drawing Functions ---
    const drawSky = (w: number, h: number, time: number) => {
      skyCtx.clearRect(0, 0, w, h);

      // Check current theme state and lerp nightProgress smoothly
      const isDark = document.documentElement.classList.contains("dark");
      const targetNight = isDark ? 1 : 0;
      nightProgress += (targetNight - nightProgress) * 0.05;

      // Sky Gradient - Smooth transition between Sunny Blue and Deep Midnight Starlight
      const drift = Math.sin(time * 0.02) * 0.02;
      const g = skyCtx.createLinearGradient(0, 0, 0, h);

      // Day colors: #0284C7 -> #38BDF8 -> #7DD3FC -> #E0F2FE
      // Night colors: #010A14 -> #021727 -> #042940 -> #083D5D
      const topR = Math.round(2 + (1 - 2) * nightProgress);
      const topG = Math.round(132 + (10 - 132) * nightProgress);
      const topB = Math.round(199 + (20 - 199) * nightProgress);

      const midR = Math.round(56 + (2 - 56) * nightProgress);
      const midG = Math.round(189 + (23 - 189) * nightProgress);
      const midB = Math.round(248 + (39 - 248) * nightProgress);

      const botR = Math.round(224 + (8 - 224) * nightProgress);
      const botG = Math.round(242 + (61 - 242) * nightProgress);
      const botB = Math.round(254 + (93 - 254) * nightProgress);

      g.addColorStop(0, `rgb(${topR}, ${topG}, ${topB})`);
      g.addColorStop(0.4 + drift, `rgb(${midR}, ${midG}, ${midB})`);
      g.addColorStop(1, `rgb(${botR}, ${botG}, ${botB})`);
      skyCtx.fillStyle = g;
      skyCtx.fillRect(0, 0, w, h);

      // --- Twinkling Starry Night Sky (Bầu trời ngàn sao lấp lánh) ---
      if (nightProgress > 0.02) {
        stars.forEach((star) => {
          const starX = star.xFactor * w;
          const starY = star.yFactor * h;
          const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.4 + 0.6;
          const alpha = star.size > 1.8 ? 0.9 * twinkle * nightProgress : 0.6 * twinkle * nightProgress;

          skyCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          skyCtx.beginPath();
          skyCtx.arc(starX, starY, star.size, 0, Math.PI * 2);
          skyCtx.fill();
        });
      }

      // --- SUN (Mặt Trời lặn dần xuống chân trời khi chuyển sang Đêm) ---
      const sunCx = w * sunState.x;
      const sunCy = h * (sunState.y + nightProgress * 0.65) + sunState.scrollOffset;
      const sunR = h * sunState.r;

      if (nightProgress < 0.95) {
        const sunAlpha = (1 - nightProgress * 0.9);
        const glow = skyCtx.createRadialGradient(sunCx, sunCy, 0, sunCx, sunCy, sunR * 3.5);
        glow.addColorStop(0, `rgba(254, 240, 138, ${0.6 * sunAlpha})`);
        glow.addColorStop(1, "rgba(254, 240, 138, 0)");
        skyCtx.fillStyle = glow;
        skyCtx.beginPath();
        skyCtx.arc(sunCx, sunCy, sunR * 3.5, 0, Math.PI * 2);
        skyCtx.fill();

        const core = skyCtx.createRadialGradient(sunCx, sunCy, 0, sunCx, sunCy, sunR);
        core.addColorStop(0, `rgba(255, 255, 255, ${sunAlpha})`);
        core.addColorStop(1, `rgba(254, 240, 138, ${sunAlpha})`);
        skyCtx.fillStyle = core;
        skyCtx.beginPath();
        skyCtx.arc(sunCx, sunCy, sunR, 0, Math.PI * 2);
        skyCtx.fill();
      }

      // --- MOON (Mặt Trăng nhô lên cao sáng lung linh khi về Đêm) ---
      if (nightProgress > 0.05) {
        const moonCx = w * 0.72;
        const moonCy = h * (0.85 - nightProgress * 0.58);
        const moonR = h * 0.075;
        const moonAlpha = nightProgress;

        // Moon Bioluminescent Glow Aura
        const moonGlow = skyCtx.createRadialGradient(moonCx, moonCy, 0, moonCx, moonCy, moonR * 3.2);
        moonGlow.addColorStop(0, `rgba(253, 230, 138, ${0.5 * moonAlpha})`);
        moonGlow.addColorStop(0.5, `rgba(45, 212, 191, ${0.25 * moonAlpha})`);
        moonGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        skyCtx.fillStyle = moonGlow;
        skyCtx.beginPath();
        skyCtx.arc(moonCx, moonCy, moonR * 3.2, 0, Math.PI * 2);
        skyCtx.fill();

        // Moon Core & Silver Crescent Shadow
        skyCtx.fillStyle = `rgba(254, 240, 138, ${0.95 * moonAlpha})`;
        skyCtx.beginPath();
        skyCtx.arc(moonCx, moonCy, moonR, 0, Math.PI * 2);
        skyCtx.fill();

        // Crescent cut out shadow for realistic moon phase
        skyCtx.fillStyle = `rgba(${topR}, ${topG}, ${topB}, ${0.9 * moonAlpha})`;
        skyCtx.beginPath();
        skyCtx.arc(moonCx + moonR * 0.45, moonCy - moonR * 0.25, moonR * 0.85, 0, Math.PI * 2);
        skyCtx.fill();
      }

      // Photorealistic Volumetric Fluffy Soft Cumulus Clouds (Mây Bồng Bềnh Xốp Mịn 100% Giống Mây Thật)
      cloudLayers.forEach((layer) => {
        for (let i = 0; i < layer.count; i++) {
          const spread = w / layer.count;
          const cx = (((i * spread + time * layer.speed * 14) % (w + spread * layer.scale * 2.2)) - spread * layer.scale * 0.4);
          const cy = h * layer.y + Math.sin(time * 0.05 + i * 1.8) * 4;
          const s = layer.scale * 48;

          // 14 Soft Volumetric Puff Coordinates forming a 100% Natural Fluffy Cumulus Cloud
          const cloudPuffs = [
            // Bottom Base Shadow Puffs (Đế mây mỏng)
            { x: -s * 1.4, y: s * 0.2, r: s * 0.55, shadow: true },
            { x: -s * 0.8, y: s * 0.25, r: s * 0.65, shadow: true },
            { x: 0, y: s * 0.3, r: s * 0.7, shadow: true },
            { x: s * 0.8, y: s * 0.25, r: s * 0.65, shadow: true },
            { x: s * 1.4, y: s * 0.2, r: s * 0.55, shadow: true },
            // Core Body Fluffy Puffs (Thân mây xốp mịn)
            { x: -s * 1.1, y: 0, r: s * 0.68 },
            { x: -s * 0.55, y: -s * 0.15, r: s * 0.82 },
            { x: 0, y: -s * 0.2, r: s * 0.95 },
            { x: s * 0.55, y: -s * 0.15, r: s * 0.85 },
            { x: s * 1.1, y: 0, r: s * 0.68 },
            // Top Apex Domes (Vòm mây nhô cao tự nhiên)
            { x: -s * 0.3, y: -s * 0.55, r: s * 0.72, top: true },
            { x: s * 0.25, y: -s * 0.5, r: s * 0.68, top: true },
            { x: -s * 0.7, y: -s * 0.4, r: s * 0.58, top: true },
            { x: s * 0.7, y: -s * 0.35, r: s * 0.55, top: true },
          ];

          skyCtx.save();
          skyCtx.translate(cx, cy);

          // Render Volumetric Feathered Gradient Puffs
          cloudPuffs.forEach((p) => {
            const radGrad = skyCtx.createRadialGradient(
              p.x, p.y - (p.top ? p.r * 0.15 : 0), p.r * 0.05,
              p.x, p.y, p.r
            );

            if (p.shadow) {
              // Base Shadow Falloff
              const shadowAlpha = isDark ? 0.45 * layer.alpha : 0.3 * layer.alpha;
              radGrad.addColorStop(0, isDark ? `rgba(14, 116, 144, ${shadowAlpha})` : `rgba(224, 242, 254, ${shadowAlpha})`);
              radGrad.addColorStop(0.7, isDark ? `rgba(6, 78, 106, ${shadowAlpha * 0.5})` : `rgba(186, 230, 253, ${shadowAlpha * 0.5})`);
              radGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
            } else if (p.top) {
              // Luminous Sunlit / Moonlit Top Highlight
              const topAlpha = isDark ? 0.95 * layer.alpha : 1.0 * layer.alpha;
              radGrad.addColorStop(0, `rgba(255, 255, 255, ${topAlpha})`);
              radGrad.addColorStop(0.65, isDark ? `rgba(253, 230, 138, ${topAlpha * 0.7})` : `rgba(255, 255, 255, ${topAlpha * 0.8})`);
              radGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
            } else {
              // Main Fluffy White Core Body
              const coreAlpha = isDark ? 0.88 * layer.alpha : 0.95 * layer.alpha;
              radGrad.addColorStop(0, `rgba(255, 255, 255, ${coreAlpha})`);
              radGrad.addColorStop(0.55, isDark ? `rgba(224, 242, 254, ${coreAlpha * 0.75})` : `rgba(255, 255, 255, ${coreAlpha * 0.85})`);
              radGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
            }

            skyCtx.fillStyle = radGrad;
            skyCtx.beginPath();
            skyCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            skyCtx.fill();
          });

          skyCtx.restore();
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

      // Floating 3D Emerald Crystal Leaves (Hiệu Ứng Tinh Thể Lá Cây Xanh Bay Lướt Qua Màn Hình)
      crystalLeaves.forEach((leaf, idx) => {
        leaf.y += leaf.speedY;
        leaf.x += leaf.speedX + Math.sin(time * 1.5 + idx) * 0.45;
        leaf.rot += leaf.rotSpeed;

        if (leaf.y > h + 40) {
          leaf.y = -40;
          leaf.x = Math.random() * w;
        }
        if (leaf.x > w + 40) {
          leaf.x = -40;
        }

        skyCtx.save();
        skyCtx.translate(leaf.x, leaf.y);
        skyCtx.rotate(leaf.rot);
        skyCtx.scale(leaf.scale, leaf.scale);

        const lSize = 13;
        const twinkle = Math.sin(time * 3 + idx) * 0.2 + 0.8;

        // 3D Low-Poly Emerald Crystal Leaf Geometry
        // Left Emerald Facet
        skyCtx.fillStyle = isDark ? `rgba(45, 212, 191, ${0.78 * twinkle})` : `rgba(16, 185, 129, ${0.82 * twinkle})`;
        skyCtx.beginPath();
        skyCtx.moveTo(0, -lSize * 1.3);
        skyCtx.lineTo(-lSize * 0.55, 0);
        skyCtx.lineTo(0, lSize * 1.3);
        skyCtx.closePath();
        skyCtx.fill();

        // Right Emerald Facet
        skyCtx.fillStyle = isDark ? `rgba(56, 189, 248, ${0.68 * twinkle})` : `rgba(52, 211, 153, ${0.72 * twinkle})`;
        skyCtx.beginPath();
        skyCtx.moveTo(0, -lSize * 1.3);
        skyCtx.lineTo(lSize * 0.55, 0);
        skyCtx.lineTo(0, lSize * 1.3);
        skyCtx.closePath();
        skyCtx.fill();

        // Glowing White Wireframe Spine & Border
        skyCtx.strokeStyle = `rgba(255, 255, 255, ${0.88 * twinkle})`;
        skyCtx.lineWidth = 1;
        skyCtx.beginPath();
        skyCtx.moveTo(0, -lSize * 1.3);
        skyCtx.lineTo(-lSize * 0.55, 0);
        skyCtx.lineTo(0, lSize * 1.3);
        skyCtx.lineTo(lSize * 0.55, 0);
        skyCtx.closePath();
        skyCtx.stroke();

        // Center Spine Line
        skyCtx.beginPath();
        skyCtx.moveTo(0, -lSize * 1.3);
        skyCtx.lineTo(0, lSize * 1.3);
        skyCtx.stroke();

        skyCtx.restore();
      });
    };

    const drawWaves = (w: number, h: number, time: number) => {
      wavesCtx.clearRect(0, 0, w, h);
      const step = isMobile ? 8 : 4;
      const isDark = document.documentElement.classList.contains("dark");

      // 1. Render 4 Realistic Trochoidal Wave Layers with Depth Gradients & Foam Crests
      waveLayers.forEach((layer, lIdx) => {
        const waveTopY = h * layer.baseY;

        // Depth Gradient for each wave layer (Surface Translucency -> Deep Water Density)
        const waveGrad = wavesCtx.createLinearGradient(0, waveTopY - 20, 0, h);
        if (isDark) {
          waveGrad.addColorStop(0, `rgba(${layer.color}, ${Math.min(1, layer.alpha * 1.15)})`);
          waveGrad.addColorStop(0.5, `rgba(4, 44, 61, ${Math.min(1, layer.alpha * 1.25)})`);
          waveGrad.addColorStop(1, "rgba(1, 14, 23, 0.98)");
        } else {
          waveGrad.addColorStop(0, `rgba(${layer.color}, ${Math.min(1, layer.alpha * 1.1)})`);
          waveGrad.addColorStop(0.6, `rgba(14, 165, 233, ${Math.min(1, layer.alpha * 1.15)})`);
          waveGrad.addColorStop(1, "rgba(3, 105, 161, 0.95)");
        }

        wavesCtx.beginPath();
        wavesCtx.moveTo(0, h);
        for (let x = 0; x <= w; x += step) {
          wavesCtx.lineTo(x, waveTopY + waveY(x, time, layer));
        }
        wavesCtx.lineTo(w, h);
        wavesCtx.closePath();
        wavesCtx.fillStyle = waveGrad;
        wavesCtx.fill();

        // Sea Foam Crest Line for EVERY wave layer (bọt sóng trắng lấp lấp lướt trên đỉnh sóng)
        wavesCtx.beginPath();
        for (let x = 0; x <= w; x += step) {
          const y = waveTopY + waveY(x, time, layer);
          x === 0 ? wavesCtx.moveTo(x, y) : wavesCtx.lineTo(x, y);
        }
        const foamAlpha = (0.45 + (lIdx / 3) * 0.4) * (0.85 + Math.sin(time * 2 + lIdx) * 0.15);
        wavesCtx.strokeStyle = isDark ? `rgba(45, 212, 191, ${foamAlpha * 0.7})` : `rgba(255, 255, 255, ${foamAlpha})`;
        wavesCtx.lineWidth = 1.2 + lIdx * 0.7;
        wavesCtx.stroke();
      });

      // 2. Sunlight / Moonlight Water Caustics Shimmer Net (Mạng Lưới Ánh Nắng / Ánh Trăng Phản Quang Trên Mặt Nước)
      const causticY = h * 0.55;
      wavesCtx.save();
      wavesCtx.lineWidth = 1.4;
      for (let c = 0; c < 16; c++) {
        const cx = ((c * (w / 16) + time * 20) % (w + 120)) - 60;
        const cy = causticY + Math.sin(cx * 0.008 + time * 1.5) * 25;
        const cLen = 50 + (c % 4) * 30;
        const shimmer = Math.sin(time * 3.2 + c) * 0.35 + 0.65;

        wavesCtx.strokeStyle = isDark ? `rgba(45, 212, 191, ${0.5 * shimmer})` : `rgba(254, 240, 138, ${0.7 * shimmer})`;
        wavesCtx.beginPath();
        wavesCtx.moveTo(cx, cy);
        wavesCtx.quadraticCurveTo(cx + cLen * 0.5, cy + Math.sin(time * 2 + c) * 14, cx + cLen, cy);
        wavesCtx.stroke();
      }
      wavesCtx.restore();

      // 2b. Solar / Lunar Reflection Gleam Path on Water (Đường Nắng / Đường Trăng Rọi Sáng Rực Rỡ Trên Mặt Biển)
      const gleamX = w * 0.72;
      const gleamY = h * 0.53;
      wavesCtx.save();
      for (let r = 0; r < 16; r++) {
        const ry = gleamY + r * 15;
        const rWidth = (20 + r * 14) * (0.8 + Math.sin(time * 2.2 + r) * 0.2);
        const rAlpha = Math.max(0, 0.75 - r * 0.042) * (0.75 + Math.sin(time * 2.8 + r) * 0.25);

        wavesCtx.fillStyle = isDark
          ? `rgba(45, 212, 191, ${rAlpha * 0.85})`
          : `rgba(254, 240, 138, ${rAlpha})`;

        wavesCtx.beginPath();
        wavesCtx.ellipse(gleamX + Math.sin(time * 1.8 + r) * 8, ry, rWidth, 2.5, 0, 0, Math.PI * 2);
        wavesCtx.fill();
      }
      wavesCtx.restore();

      // 3. Golden Beach Sand Shoreline at the Bottom of Canvas
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

      // Front Wave Foam Splashes & Bubbles
      const frontLayer = waveLayers[3];
      wavesCtx.beginPath();
      for (let x = 0; x <= w; x += step) {
        const y = h * frontLayer.baseY + waveY(x, time, frontLayer);
        x === 0 ? wavesCtx.moveTo(x, y) : wavesCtx.lineTo(x, y);
      }
      wavesCtx.strokeStyle = `rgba(255, 255, 255, ${0.85 + Math.sin(time * 2) * 0.15})`;
      wavesCtx.lineWidth = 3.5;
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

      // Water Droplets & Surface Sparkles
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


          {/* 3D Crystalline Gemstone Chamfer Header Badge */}
          <div className="mb-4 inline-flex items-center gap-2.5 px-4 py-2 poly-badge bg-gradient-to-r from-[#022433] via-[#043247] to-[#022433] border border-[#FDE68A] shadow-[0_0_20px_rgba(253,230,138,0.5)] backdrop-blur-xl">
            <span className="w-2.5 h-2.5 poly-octagon bg-[#2DD4BF] animate-pulse shadow-[0_0_10px_#2DD4BF]" />
            <span className="font-mono text-xs text-[#FDE68A] font-extrabold uppercase tracking-widest">
              CAPTAIN & SOFTWARE ENGINEER
            </span>
          </div>

          {/* Slender Fluid Signature Typography Headline for "Nguyen Thanh Duy" */}
          <div className="relative mb-3">
            <h1 className="font-signature text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-normal leading-[1.1] tracking-wide antialiased">
              <span className="bg-gradient-to-r from-white via-teal-100 to-[#2DD4BF] bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(45,212,191,0.5)]">
                Nguyen
              </span>{" "}
              <span className="bg-gradient-to-r from-[#2DD4BF] via-[#FDE68A] to-white bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(253,230,138,0.6)]">
                Thanh Duy
              </span>
            </h1>
            {/* Sleek Signature Underline Flourish Line */}
            <div className="h-[1.5px] w-36 bg-gradient-to-r from-[#2DD4BF] via-[#FDE68A] to-transparent rounded-full mt-1 shadow-[0_0_12px_rgba(45,212,191,0.8)]" />
          </div>

          <p className="font-fraunces text-xl md:text-2xl text-[#FDE68A] italic mb-4 drop-shadow-md">
            Software Engineer & AI Builder
          </p>

          <p className="font-jakarta text-sm md:text-base text-white leading-relaxed max-w-[45ch] mb-8 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
            Engineering Graph-RAG architectures & high-performance backend systems at UTT Hanoi.
          </p>

          {/* Action CTAs - 3D Low-Poly Polygonal Chamfered Buttons */}
          <div className="flex gap-4 flex-wrap mb-8">
            <a
              href="#projects"
              className="font-jakarta inline-flex items-center gap-2.5 px-7 py-3.5 poly-badge bg-gradient-to-r from-[#06B6D4] via-[#2DD4BF] to-[#14B8A6] hover:from-[#0284c7] hover:to-[#0f766e] text-white font-extrabold text-sm shadow-xl hover:shadow-[0_10px_30px_rgba(45,212,191,0.5)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <OceanIcon name="sailboat" className="w-4 h-4 text-white" /> Selected Works
            </a>
            <a
              href="#contact"
              className="font-jakarta inline-flex items-center gap-2 px-7 py-3.5 poly-badge border border-white/60 bg-white/15 hover:bg-white/30 text-white font-bold backdrop-blur-xl text-sm transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-lg"
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
              className="p-3 poly-badge border border-white/40 bg-white/15 hover:bg-white/35 text-white transition-all duration-300 hover:scale-110 hover:border-[#FDE68A] shadow-md"
              aria-label="GitHub"
            >
              <OceanIcon name="github" className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${portfolioConfig.email}`}
              className="p-3 poly-badge border border-white/40 bg-white/15 hover:bg-white/35 text-white transition-all duration-300 hover:scale-110 hover:border-[#FDE68A] shadow-md"
              aria-label="Email"
            >
              <OceanIcon name="mail" className="w-4 h-4" />
            </a>
            <a
              href={portfolioConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 poly-badge border border-white/40 bg-white/15 hover:bg-white/35 text-white transition-all duration-300 hover:scale-110 hover:border-[#FDE68A] shadow-md"
              aria-label="Resume"
            >
              <OceanIcon name="terminal" className="w-4 h-4" />
            </a>
            <div className="w-px h-4 bg-white/40 mx-1" />
            <span className="font-mono text-xs text-[#FDE68A] font-bold tracking-wider">UTT · HANOI</span>
          </div>
        </motion.div>

        {/* Right Column Profile Showcase (5 cols) - 3D Globe Sphere Sanctuary with Orbiting Achievements & Swaying Palms */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center items-center relative py-8"
        >
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1000}
            transitionSpeed={1200}
            gyroscope={true}
            className="relative flex flex-col items-center justify-center p-4"
          >
            {/* --- Lush Swaying Tropical Palm Fronds framing the Globe --- */}

            {/* Top-Right Swaying Palm Frond Cluster */}
            <svg className="absolute -top-14 -right-10 w-48 h-48 z-30 pointer-events-none transform rotate-12 drop-shadow-2xl animate-sway" viewBox="0 0 200 200" fill="none">
              <path d="M20,180 C50,110 110,60 180,20 C150,60 110,110 90,180 Z" fill="#2DD4BF" opacity="0.95" />
              <path d="M20,180 C70,120 130,80 195,40 C160,80 120,130 90,180 Z" fill="#FDE68A" opacity="0.9" />
              <path d="M20,180 C40,130 80,90 150,50 C120,90 80,130 60,180 Z" fill="#06B6D4" opacity="0.85" />
            </svg>

            {/* Top-Left Swaying Palm Frond Cluster */}
            <svg className="absolute -top-12 -left-12 w-44 h-44 z-30 pointer-events-none transform -rotate-45 drop-shadow-2xl animate-sway [animation-delay:1.5s]" viewBox="0 0 200 200" fill="none">
              <path d="M180,180 C150,110 90,60 20,20 C50,60 90,110 110,180 Z" fill="#2DD4BF" opacity="0.9" />
              <path d="M180,180 C130,120 70,80 5,40 C40,80 80,130 110,180 Z" fill="#FDE68A" opacity="0.85" />
            </svg>

            {/* Bottom-Right Golden Palm Leaf */}
            <svg className="absolute -bottom-8 -right-8 w-40 h-40 z-30 pointer-events-none transform rotate-45 drop-shadow-2xl animate-sway [animation-delay:3s]" viewBox="0 0 200 200" fill="none">
              <path d="M20,20 C80,60 130,110 180,180 C120,140 70,90 20,20 Z" fill="#FDE68A" opacity="0.85" />
              <path d="M40,20 C90,70 140,120 190,190 C130,150 80,100 40,20 Z" fill="#2DD4BF" opacity="0.75" />
            </svg>

            {/* Bottom-Left Emerald Palm Leaf */}
            <svg className="absolute -bottom-10 -left-8 w-36 h-36 z-30 pointer-events-none transform -rotate-12 drop-shadow-2xl animate-sway [animation-delay:2.2s]" viewBox="0 0 200 200" fill="none">
              <path d="M180,20 C120,60 70,110 20,180 C80,140 130,90 180,20 Z" fill="#14B8A6" opacity="0.85" />
            </svg>

            {/* --- 3D Holographic Globe Outer Orbital Rings --- */}
            {/* Orbital Ring 1: Continuous Spinning Longitude Ring */}
            <div className="absolute -inset-4 md:-inset-6 rounded-full border-2 border-dashed border-[#2DD4BF]/60 animate-[spin_30s_linear_infinite] pointer-events-none shadow-[0_0_20px_rgba(45,212,191,0.4)]" />

            {/* Orbital Ring 2: Reverse Spinning Latitude Ring */}
            <div className="absolute -inset-10 md:-inset-12 rounded-full border border-dashed border-[#FDE68A]/50 animate-[spin_45s_linear_infinite_reverse] pointer-events-none opacity-80" />

            {/* Orbiting Equatorial Glow Path Ring */}
            <div className="absolute inset-0 rounded-full border border-teal-200/40 pointer-events-none shadow-[0_0_50px_rgba(45,212,191,0.5)]" />

            {/* --- ORBITING ACHIEVEMENT BADGES (3D Low-Poly Polygonal Chamfered Badges) --- */}

            {/* Orbiting Badge #1: Top 6 AI Hackathon 2026 (Top-Right Orbit) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
              className="absolute -top-6 -right-4 md:-right-10 z-40 cursor-default"
            >
              <div className="flex items-center gap-2 px-3.5 py-1.5 poly-badge border border-[#FDE68A] bg-[#022433]/92 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all group">
                <OceanIcon name="trophy" className="w-3.5 h-3.5 text-[#FDE68A] group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[10px] md:text-[11px] font-extrabold text-white">
                  Top 6 <span className="text-[#FDE68A]">· AI Hackathon</span>
                </span>
              </div>
            </motion.div>

            {/* Orbiting Badge #2: Academic GPA 3.64 / 4.00 (Top-Left Orbit) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -top-5 -left-4 md:-left-12 z-40 cursor-default"
            >
              <div className="flex items-center gap-2 px-3.5 py-1.5 poly-badge border border-[#2DD4BF] bg-[#022433]/92 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all group">
                <OceanIcon name="star" className="w-3.5 h-3.5 text-[#2DD4BF] group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[10px] md:text-[11px] font-extrabold text-white">
                  GPA <span className="text-[#2DD4BF]">3.64 / 4.00</span>
                </span>
              </div>
            </motion.div>

            {/* Orbiting Badge #3: 3rd Place Social AI (Bottom-Right Orbit) */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-5 -right-4 md:-right-8 z-40 cursor-default"
            >
              <div className="flex items-center gap-2 px-3.5 py-1.5 poly-badge border border-[#FDE68A] bg-[#022433]/92 backdrop-blur-2xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all group">
                <OceanIcon name="trophy" className="w-3.5 h-3.5 text-[#FDE68A] group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[10px] md:text-[11px] font-extrabold text-white">
                  3rd Place <span className="text-[#FDE68A]">· Social AI</span>
                </span>
              </div>
            </motion.div>

            {/* --- 3D Globe Sphere Sanctuary Photo Window --- */}
            <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full p-3 bg-gradient-to-br from-[#2DD4BF] via-[#043247] to-[#022433] border-4 border-[#2DD4BF] shadow-[0_0_80px_rgba(45,212,191,0.6)] group">
              
              {/* Inner Convex Lens (Photo 100% Crystal Clear & Crisp) */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/80 bg-[#0284C7] shadow-[inset_0_0_25px_rgba(0,0,0,0.5)]">
                <Image
                  src="/assets/images/profile.jpeg"
                  alt="Nguyen Thanh Duy - Software Engineer"
                  fill
                  sizes="(max-width: 768px) 280px, 350px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-108 contrast-[1.05] brightness-[1.03]"
                  priority
                />

                {/* Subtle Clean Edge Glow Arc */}
                <div className="absolute inset-0 rounded-full border border-white/30 pointer-events-none shadow-[inset_0_2px_15px_rgba(255,255,255,0.3)]" />
              </div>

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
