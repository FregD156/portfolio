"use client";

import React, { useEffect, useRef } from "react";

interface Creature {
  type: "fish" | "jellyfish" | "mantaray" | "turtle" | "plankton";
  x: number;
  y: number;
  speed: number;
  scale: number;
  direction: number; // 1 for right, -1 for left
  phase: number;
  depthZone: "shallow" | "twilight" | "abyss" | "all";
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
    let scrollProgress = 0;

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
        scrollProgress = Math.min(1, Math.max(0, window.scrollY / totalScrollable));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const w = () => window.innerWidth;
    const h = () => window.innerHeight;

    // --- Generate Marine Creatures ---
    const creatures: Creature[] = [];

    // Fish school (shallow to mid)
    for (let i = 0; i < 9; i++) {
      creatures.push({
        type: "fish",
        x: Math.random() * w(),
        y: (0.05 + Math.random() * 0.45) * h(),
        speed: 0.8 + Math.random() * 1.2,
        scale: 0.6 + Math.random() * 0.6,
        direction: Math.random() > 0.4 ? 1 : -1,
        phase: Math.random() * Math.PI * 2,
        depthZone: "shallow",
        color: "rgba(56, 189, 248, 0.45)",
      });
    }

    // Manta Rays (twilight depth)
    for (let i = 0; i < 3; i++) {
      creatures.push({
        type: "mantaray",
        x: Math.random() * w(),
        y: (0.35 + Math.random() * 0.4) * h(),
        speed: 0.4 + Math.random() * 0.4,
        scale: 0.8 + Math.random() * 0.7,
        direction: Math.random() > 0.5 ? 1 : -1,
        phase: Math.random() * Math.PI * 2,
        depthZone: "twilight",
        color: "rgba(20, 184, 166, 0.35)",
      });
    }

    // Glowing Jellyfish (deep ocean)
    for (let i = 0; i < 6; i++) {
      creatures.push({
        type: "jellyfish",
        x: Math.random() * w(),
        y: (0.55 + Math.random() * 0.4) * h(),
        speed: 0.2 + Math.random() * 0.3,
        scale: 0.7 + Math.random() * 0.6,
        direction: 1,
        phase: Math.random() * Math.PI * 2,
        depthZone: "abyss",
        color: "rgba(255, 126, 95, 0.45)",
      });
    }

    // Sea Turtles (all zones)
    for (let i = 0; i < 2; i++) {
      creatures.push({
        type: "turtle",
        x: Math.random() * w(),
        y: (0.2 + Math.random() * 0.6) * h(),
        speed: 0.5 + Math.random() * 0.4,
        scale: 0.8 + Math.random() * 0.5,
        direction: Math.random() > 0.5 ? 1 : -1,
        phase: Math.random() * Math.PI * 2,
        depthZone: "all",
        color: "rgba(20, 184, 166, 0.4)",
      });
    }

    // Rising Bubbles
    const bubbles = Array.from({ length: 35 }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      r: 1.5 + Math.random() * 3,
      speed: 0.4 + Math.random() * 0.8,
      wobble: Math.random() * Math.PI * 2,
    }));

    // --- Helper Drawing Routines ---
    const drawFish = (c: Creature, time: number) => {
      ctx.save();
      ctx.translate(c.x, c.y);
      if (c.direction === -1) ctx.scale(-1, 1);
      ctx.scale(c.scale, c.scale);

      const tailWag = Math.sin(time * 6 + c.phase) * 4;

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

      // Eye dot
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
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

      const wingFlap = Math.sin(time * 2 + c.phase) * 6;

      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.moveTo(25, 0);
      ctx.quadraticCurveTo(0, -25 - wingFlap, -20, -5);
      ctx.quadraticCurveTo(-15, 0, -20, 5);
      ctx.quadraticCurveTo(0, 25 + wingFlap, 25, 0);
      ctx.closePath();
      ctx.fill();

      // Tail whip
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

      const pulse = Math.sin(time * 2.5 + c.phase) * 3;

      // Glow umbrella
      const grad = ctx.createRadialGradient(0, -5, 0, 0, -5, 18);
      grad.addColorStop(0, "rgba(255, 209, 102, 0.65)");
      grad.addColorStop(0.7, c.color);
      grad.addColorStop(1, "rgba(255, 126, 95, 0)");
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.arc(0, -5, 16 + pulse, Math.PI, 0);
      ctx.quadraticCurveTo(0, 5, 0, 5);
      ctx.closePath();
      ctx.fill();

      // Tentacles
      ctx.strokeStyle = "rgba(255, 209, 102, 0.4)";
      ctx.lineWidth = 1.2;
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

      const paddle = Math.sin(time * 2 + c.phase) * 8;

      ctx.fillStyle = c.color;
      // Shell
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Head
      ctx.beginPath();
      ctx.arc(18, 0, 5, 0, Math.PI * 2);
      ctx.fill();

      // Front flapper
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

      ctx.clearRect(0, 0, width, height);

      // 1. Dynamic Ocean Depth Background Gradient
      // Interpolate depth colors based on scrollProgress (0 = Shallow Sunlit, 0.5 = Mid Twilight, 1.0 = Abyssal Deep)
      const g = ctx.createLinearGradient(0, 0, 0, height);

      if (scrollProgress < 0.45) {
        // Shallow Sunlit Ocean Zone
        const factor = scrollProgress / 0.45;
        g.addColorStop(0, `rgba(5, 25, 35, ${0.9 + factor * 0.1})`);
        g.addColorStop(0.5, "#082836");
        g.addColorStop(1, "#04141e");
      } else if (scrollProgress < 0.8) {
        // Mid Twilight Ocean Zone
        g.addColorStop(0, "#04141e");
        g.addColorStop(0.6, "#031019");
        g.addColorStop(1, "#020a11");
      } else {
        // Abyssal Deep Sea Zone
        g.addColorStop(0, "#020a11");
        g.addColorStop(0.5, "#01070d");
        g.addColorStop(1, "#000307");
      }

      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // 2. Global Ocean Ambient Waves
      const waveAlpha = 0.12 - scrollProgress * 0.06;
      ctx.fillStyle = `rgba(56, 189, 248, ${Math.max(0.03, waveAlpha)})`;
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 12) {
        const y = height * 0.4 + Math.sin(x * 0.005 + t * 0.8) * 15 + Math.cos(x * 0.01 + t * 0.5) * 10;
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

        ctx.strokeStyle = `rgba(224, 242, 254, ${0.25 + Math.sin(t + b.wobble) * 0.1})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.stroke();

        // Bubble highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.3, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Swim & Render Marine Creatures
      creatures.forEach((c) => {
        // Move creature
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
          // Jellyfish vertical bobbing & slow drift
          c.y -= c.speed * 0.6;
          c.x += Math.sin(t * 0.7 + c.phase) * 0.6;
          if (c.y < -40) {
            c.y = height + 40;
            c.x = Math.random() * width;
          }
        }

        // Draw based on type
        if (c.type === "fish") drawFish(c, t);
        else if (c.type === "mantaray") drawMantaRay(c, t);
        else if (c.type === "jellyfish") drawJellyfish(c, t);
        else if (c.type === "turtle") drawTurtle(c, t);
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
