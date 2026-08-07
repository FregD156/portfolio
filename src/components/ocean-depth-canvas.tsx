"use client";

import React, { useEffect, useRef } from "react";

interface Creature {
  type: "fish" | "jellyfish" | "mantaray" | "turtle";
  x: number;
  y: number;
  speed: number;
  scale: number;
  direction: number; // 1 for right, -1 for left
  phase: number;
  color: string;
}

export function OceanDepthCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Handle Resize & DPR
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Track scroll depth
    const handleScroll = () => {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable > 0) {
        targetScrollProgress = Math.min(1, Math.max(0, window.scrollY / totalScrollable));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    // --- Generate Marine Creatures ---
    const creatures: Creature[] = [];

    // Fish school (shallow to mid)
    for (let i = 0; i < 11; i++) {
      creatures.push({
        type: "fish",
        x: Math.random() * w(),
        y: (0.05 + Math.random() * 0.5) * h(),
        speed: 0.9 + Math.random() * 1.3,
        scale: 0.6 + Math.random() * 0.6,
        direction: Math.random() > 0.4 ? 1 : -1,
        phase: Math.random() * Math.PI * 2,
        color: i % 2 === 0 ? "rgba(56, 189, 248, 0.65)" : "rgba(255, 209, 102, 0.65)",
      });
    }

    // Manta Rays
    for (let i = 0; i < 3; i++) {
      creatures.push({
        type: "mantaray",
        x: Math.random() * w(),
        y: (0.3 + Math.random() * 0.45) * h(),
        speed: 0.45 + Math.random() * 0.4,
        scale: 0.8 + Math.random() * 0.7,
        direction: Math.random() > 0.5 ? 1 : -1,
        phase: Math.random() * Math.PI * 2,
        color: "rgba(20, 184, 166, 0.5)",
      });
    }

    // Glowing Jellyfish
    for (let i = 0; i < 6; i++) {
      creatures.push({
        type: "jellyfish",
        x: Math.random() * w(),
        y: (0.5 + Math.random() * 0.45) * h(),
        speed: 0.25 + Math.random() * 0.35,
        scale: 0.7 + Math.random() * 0.6,
        direction: 1,
        phase: Math.random() * Math.PI * 2,
        color: "rgba(255, 126, 95, 0.6)",
      });
    }

    // Sea Turtles
    for (let i = 0; i < 3; i++) {
      creatures.push({
        type: "turtle",
        x: Math.random() * w(),
        y: (0.15 + Math.random() * 0.65) * h(),
        speed: 0.5 + Math.random() * 0.4,
        scale: 0.8 + Math.random() * 0.5,
        direction: Math.random() > 0.5 ? 1 : -1,
        phase: Math.random() * Math.PI * 2,
        color: "rgba(14, 165, 233, 0.55)",
      });
    }

    // Rising Bubbles
    const bubbles = Array.from({ length: 40 }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      r: 1.5 + Math.random() * 3.5,
      speed: 0.5 + Math.random() * 0.9,
      wobble: Math.random() * Math.PI * 2,
    }));

    // --- Helper Drawing Routines ---
    const drawFish = (c: Creature, time: number) => {
      ctx.save();
      ctx.translate(c.x, c.y);
      if (c.direction === -1) ctx.scale(-1, 1);
      ctx.scale(c.scale, c.scale);

      const tailWag = Math.sin(time * 7 + c.phase) * 4;

      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, 14, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tail
      ctx.beginPath();
      ctx.moveTo(-12, 0);
      ctx.lineTo(-20, -7 + tailWag);
      ctx.lineTo(-20, 7 + tailWag);
      ctx.closePath();
      ctx.fill();

      // Eye
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.beginPath();
      ctx.arc(8, -2, 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawMantaRay = (c: Creature, time: number) => {
      ctx.save();
      ctx.translate(c.x, c.y);
      if (c.direction === -1) ctx.scale(-1, 1);
      ctx.scale(c.scale, c.scale);

      const wingFlap = Math.sin(time * 2.2 + c.phase) * 6;

      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.moveTo(25, 0);
      ctx.quadraticCurveTo(0, -25 - wingFlap, -20, -5);
      ctx.quadraticCurveTo(-15, 0, -20, 5);
      ctx.quadraticCurveTo(0, 25 + wingFlap, 25, 0);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = c.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-20, 0);
      ctx.quadraticCurveTo(-35, Math.sin(time * 3) * 5, -50, 0);
      ctx.stroke();

      ctx.restore();
    };

    const drawJellyfish = (c: Creature, time: number) => {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.scale(c.scale, c.scale);

      const pulse = Math.sin(time * 2.8 + c.phase) * 3;

      const grad = ctx.createRadialGradient(0, -5, 0, 0, -5, 18);
      grad.addColorStop(0, "rgba(255, 209, 102, 0.75)");
      grad.addColorStop(0.7, c.color);
      grad.addColorStop(1, "rgba(255, 126, 95, 0)");
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.arc(0, -5, 16 + pulse, Math.PI, 0);
      ctx.quadraticCurveTo(0, 5, 0, 5);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "rgba(255, 209, 102, 0.5)";
      ctx.lineWidth = 1.4;
      for (let i = -10; i <= 10; i += 5) {
        ctx.beginPath();
        ctx.moveTo(i, 5);
        ctx.quadraticCurveTo(i + Math.sin(time * 3 + i) * 6, 20, i + Math.sin(time * 2 + i) * 4, 35);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawTurtle = (c: Creature, time: number) => {
      ctx.save();
      ctx.translate(c.x, c.y);
      if (c.direction === -1) ctx.scale(-1, 1);
      ctx.scale(c.scale, c.scale);

      const paddle = Math.sin(time * 2.2 + c.phase) * 8;

      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(18, 0, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(6, -8);
      ctx.quadraticCurveTo(15, -22 + paddle, 4, -20);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(6, 8);
      ctx.quadraticCurveTo(15, 22 - paddle, 4, 20);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // --- Render Loop ---
    const render = () => {
      t += 0.016;
      const width = w();
      const height = h();

      // Smooth lerp scroll progress for buttery smooth depth transitions
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // 1. Continuous Butter-Smooth Sunlit Ocean Depth Gradient (100% Seamless RGB Lerp)
      const g = ctx.createLinearGradient(0, 0, 0, height);

      // Helper RGB lerp
      const lerpRGB = (c1: [number, number, number], c2: [number, number, number], factor: number) => {
        const r = Math.round(c1[0] + (c2[0] - c1[0]) * factor);
        const gCol = Math.round(c1[1] + (c2[1] - c1[1]) * factor);
        const b = Math.round(c1[2] + (c2[2] - c1[2]) * factor);
        return `rgb(${r}, ${gCol}, ${b})`;
      };

      // 3 Depth Keyframe Palettes: 0.0 (Shallow) -> 0.5 (Mid) -> 1.0 (Deep Abyssal)
      let topColor: string, midColor: string, botColor: string;

      if (currentScrollProgress < 0.5) {
        const p = currentScrollProgress / 0.5;
        topColor = lerpRGB([3, 105, 161], [12, 74, 110], p);
        midColor = lerpRGB([7, 89, 133], [8, 51, 68], p);
        botColor = lerpRGB([12, 74, 110], [5, 25, 35], p);
      } else {
        const p = (currentScrollProgress - 0.5) / 0.5;
        topColor = lerpRGB([12, 74, 110], [5, 25, 35], p);
        midColor = lerpRGB([8, 51, 68], [4, 20, 30], p);
        botColor = lerpRGB([5, 25, 35], [2, 10, 17], p);
      }

      g.addColorStop(0, topColor);
      g.addColorStop(0.5, midColor);
      g.addColorStop(1, botColor);

      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // 2. Global Ocean Ambient Waves
      const waveAlpha = 0.16 - currentScrollProgress * 0.08;
      ctx.fillStyle = `rgba(56, 189, 248, ${Math.max(0.05, waveAlpha)})`;
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 12) {
        const y = height * 0.35 + Math.sin(x * 0.005 + t * 0.9) * 16 + Math.cos(x * 0.01 + t * 0.6) * 12;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // 3. Rising Sea Bubbles
      bubbles.forEach((b) => {
        b.y -= b.speed;
        b.x += Math.sin(t * 1.5 + b.wobble) * 0.4;
        if (b.y < -20) {
          b.y = height + 20;
          b.x = Math.random() * width;
        }

        ctx.strokeStyle = `rgba(224, 242, 254, ${0.35 + Math.sin(t + b.wobble) * 0.12})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.3, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Swim & Render Marine Creatures
      creatures.forEach((c) => {
        if (c.type !== "jellyfish") {
          c.x += c.speed * c.direction;
          c.y += Math.sin(t * 0.8 + c.phase) * 0.5;

          if (c.direction === 1 && c.x > width + 60) {
            c.x = -60;
            c.y = Math.random() * height;
          } else if (c.direction === -1 && c.x < -60) {
            c.x = width + 60;
            c.y = Math.random() * height;
          }
        } else {
          c.y -= c.speed * 0.6;
          c.x += Math.sin(t * 0.7 + c.phase) * 0.6;
          if (c.y < -40) {
            c.y = height + 40;
            c.x = Math.random() * width;
          }
        }

        if (c.type === "fish") drawFish(c, t);
        else if (c.type === "mantaray") drawMantaRay(c, t);
        else if (c.type === "jellyfish") drawJellyfish(c, t);
        else if (c.type === "turtle") drawTurtle(c, t);
      });

      // 5. --- ELEGANT MINIMALIST SEABED CONTOUR & SUBTLE SEA REEDS ---
      const seabedY = height * 0.94;

      // Soft Subtle Ocean Seabed Contour (Layer 1)
      const seabedGrad = ctx.createLinearGradient(0, seabedY - 30, 0, height);
      seabedGrad.addColorStop(0, "rgba(4, 44, 61, 0.5)");
      seabedGrad.addColorStop(1, "rgba(1, 14, 23, 0.8)");
      ctx.fillStyle = seabedGrad;
      ctx.strokeStyle = "rgba(45, 212, 191, 0.25)";
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, seabedY - 25);
      ctx.quadraticCurveTo(width * 0.15, seabedY - 45, width * 0.35, seabedY - 10);
      ctx.lineTo(width * 0.65, seabedY - 10);
      ctx.quadraticCurveTo(width * 0.85, seabedY - 45, width, seabedY - 20);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Subtle & Elegant Swaying Sea Reeds (Tảo Biển Tinh Tế & Nhẹ Nhàng)
      const reedPositions = [
        { x: width * 0.04, h: 45 },
        { x: width * 0.08, h: 55 },
        { x: width * 0.12, h: 40 },
        { x: width * 0.88, h: 42 },
        { x: width * 0.92, h: 58 },
        { x: width * 0.96, h: 48 },
      ];

      reedPositions.forEach((r, i) => {
        const rx = r.x;
        const ry = seabedY - 10;
        const rh = r.h;
        const sway = Math.sin(t * 1.2 + i) * 12;

        ctx.strokeStyle = i % 2 === 0 ? "rgba(45, 212, 191, 0.45)" : "rgba(253, 230, 138, 0.4)";
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.quadraticCurveTo(rx + sway * 0.5, ry - rh * 0.5, rx + sway, ry - rh);
        ctx.stroke();

        // Subtle Soft Glowing Spore Dot
        ctx.fillStyle = i % 2 === 0 ? "rgba(45, 212, 191, 0.8)" : "rgba(253, 230, 138, 0.8)";
        ctx.beginPath();
        ctx.arc(rx + sway, ry - rh, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduceMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (reduceMotion) {
      render();
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-[-5]"
    />
  );
}

