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

    // --- Masterpiece 3D Pixar Cartoon Shaded Drawing Routines ---
    const drawFish = (c: Creature, time: number) => {
      ctx.save();
      ctx.translate(c.x, c.y);
      if (c.direction === -1) ctx.scale(-1, 1);
      ctx.scale(c.scale, c.scale);

      const tailWag = Math.sin(time * 8 + c.phase) * 5;

      // 3D Shaded Body (Convex Volume Gradient)
      const bodyGrad = ctx.createLinearGradient(0, -8, 0, 8);
      bodyGrad.addColorStop(0, "#FF7E5F");
      bodyGrad.addColorStop(0.5, c.color);
      bodyGrad.addColorStop(1, "#022433");
      ctx.fillStyle = bodyGrad;

      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // 3D Cartoon White Stripe Band
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.beginPath();
      ctx.ellipse(-2, 0, 3.5, 7.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // 3D Animated Tail Fin
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.moveTo(-14, 0);
      ctx.quadraticCurveTo(-22, -9 + tailWag, -25, -10 + tailWag);
      ctx.quadraticCurveTo(-20, 0, -25, 10 + tailWag);
      ctx.quadraticCurveTo(-22, 9 + tailWag, -14, 0);
      ctx.closePath();
      ctx.fill();

      // Expressive 3D Cartoon Eye
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(9, -2.5, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#01141E";
      ctx.beginPath();
      ctx.arc(10, -2.5, 1.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(10.5, -3.2, 0.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawMantaRay = (c: Creature, time: number) => {
      ctx.save();
      ctx.translate(c.x, c.y);
      if (c.direction === -1) ctx.scale(-1, 1);
      ctx.scale(c.scale, c.scale);

      const wingFlap = Math.sin(time * 2.5 + c.phase) * 7;

      // 3D Wing Gradient with Top Light Sheen
      const rayGrad = ctx.createLinearGradient(0, -30, 0, 30);
      rayGrad.addColorStop(0, "#2DD4BF");
      rayGrad.addColorStop(0.4, "#0682A6");
      rayGrad.addColorStop(1, "#022433");
      ctx.fillStyle = rayGrad;

      ctx.beginPath();
      ctx.moveTo(28, 0);
      ctx.quadraticCurveTo(2, -30 - wingFlap, -22, -6);
      ctx.quadraticCurveTo(-16, 0, -22, 6);
      ctx.quadraticCurveTo(2, 30 + wingFlap, 28, 0);
      ctx.closePath();
      ctx.fill();

      // 3D Wing Edge Highlight
      ctx.strokeStyle = "rgba(45, 212, 191, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Dual 3D Cephalic Fins (Sừng Cá Đuối Cute)
      ctx.fillStyle = "#2DD4BF";
      ctx.beginPath();
      ctx.arc(26, -5, 3, 0, Math.PI * 2);
      ctx.arc(26, 5, 3, 0, Math.PI * 2);
      ctx.fill();

      // 3D Whip Tail
      ctx.strokeStyle = "rgba(45, 212, 191, 0.8)";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-22, 0);
      ctx.quadraticCurveTo(-40, Math.sin(time * 3.5) * 6, -60, 0);
      ctx.stroke();

      ctx.restore();
    };

    const drawJellyfish = (c: Creature, time: number) => {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.scale(c.scale, c.scale);

      const pulse = Math.sin(time * 3.2 + c.phase) * 3.5;

      // 3D Translucent Umbrella Bell (Convex Shading)
      const bellGrad = ctx.createRadialGradient(0, -8, 2, 0, -8, 20);
      bellGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      bellGrad.addColorStop(0.3, "rgba(45, 212, 191, 0.85)");
      bellGrad.addColorStop(0.85, c.color);
      bellGrad.addColorStop(1, "rgba(2, 36, 51, 0.2)");
      ctx.fillStyle = bellGrad;

      ctx.beginPath();
      ctx.arc(0, -6, 18 + pulse, Math.PI, 0);
      ctx.quadraticCurveTo(0, 6, 0, 6);
      ctx.closePath();
      ctx.fill();

      // 3D Umbrella Rim Highlight Arc
      ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -6, 18 + pulse, Math.PI * 1.1, Math.PI * 1.9);
      ctx.stroke();

      // 3D Bioluminescent Organ Core
      const organGrad = ctx.createRadialGradient(0, -4, 0, 0, -4, 8);
      organGrad.addColorStop(0, "#FDE68A");
      organGrad.addColorStop(1, "rgba(253, 230, 138, 0)");
      ctx.fillStyle = organGrad;
      ctx.beginPath();
      ctx.arc(0, -4, 7, 0, Math.PI * 2);
      ctx.fill();

      // 3D Wavy Tentacles with Glowing Spore Tips
      for (let i = -12; i <= 12; i += 4.5) {
        const sway = Math.sin(time * 3.5 + i + c.phase) * 6;
        ctx.strokeStyle = i % 2 === 0 ? "rgba(45, 212, 191, 0.85)" : "rgba(253, 230, 138, 0.85)";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(i, 6);
        ctx.quadraticCurveTo(i + sway * 0.5, 22, i + sway, 38);
        ctx.stroke();

        // 3D Glowing Spore Tip
        ctx.fillStyle = i % 2 === 0 ? "#2DD4BF" : "#FDE68A";
        ctx.beginPath();
        ctx.arc(i + sway, 38, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const drawTurtle = (c: Creature, time: number) => {
      ctx.save();
      ctx.translate(c.x, c.y);
      if (c.direction === -1) ctx.scale(-1, 1);
      ctx.scale(c.scale, c.scale);

      const paddle = Math.sin(time * 2.4 + c.phase) * 9;

      // 3D Carapace Shell Gradient
      const shellGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 18);
      shellGrad.addColorStop(0, "#FDE68A");
      shellGrad.addColorStop(0.5, c.color);
      shellGrad.addColorStop(1, "#022433");
      ctx.fillStyle = shellGrad;

      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 13, 0, 0, Math.PI * 2);
      ctx.fill();

      // 3D Carapace Shell Rim Highlight
      ctx.strokeStyle = "rgba(253, 230, 138, 0.8)";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // 3D Turtle Head
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.arc(20, 0, 5.5, 0, Math.PI * 2);
      ctx.fill();

      // Cute 3D Cartoon Eye
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(22, -2, 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#01141E";
      ctx.beginPath();
      ctx.arc(22.5, -2, 0.9, 0, Math.PI * 2);
      ctx.fill();

      // 3D Flippers
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.moveTo(8, -9);
      ctx.quadraticCurveTo(18, -25 + paddle, 4, -22);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(8, 9);
      ctx.quadraticCurveTo(18, 25 - paddle, 4, 22);
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

      // 3 Fresh Depth Keyframe Palettes: 0.0 (Vibrant Summer) -> 0.5 (Mid Turquoise) -> 1.0 (Fresh Deep Lagoon)
      let topColor: string, midColor: string, botColor: string;

      if (currentScrollProgress < 0.5) {
        const p = currentScrollProgress / 0.5;
        topColor = lerpRGB([2, 132, 199], [3, 79, 107], p);
        midColor = lerpRGB([6, 182, 212], [6, 110, 140], p);
        botColor = lerpRGB([45, 212, 191], [12, 74, 110], p);
      } else {
        const p = (currentScrollProgress - 0.5) / 0.5;
        topColor = lerpRGB([3, 79, 107], [2, 48, 69], p);
        midColor = lerpRGB([6, 110, 140], [4, 60, 84], p);
        botColor = lerpRGB([12, 74, 110], [3, 35, 52], p);
      }

      g.addColorStop(0, topColor);
      g.addColorStop(0.5, midColor);
      g.addColorStop(1, botColor);

      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // 2a. Global Ocean Ambient Waves
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

      // 2b. 3D Volumetric Ocean Sunlight Beams (Tia Sáng 3D Chiếu Thủy Tinh)
      const causticsCount = 4;
      for (let i = 0; i < causticsCount; i++) {
        const beamX = (width / causticsCount) * i + Math.sin(t * 0.4 + i) * 60;
        const beamWidth = 80 + Math.sin(t * 0.8 + i) * 20;

        const beamGrad = ctx.createLinearGradient(beamX, 0, beamX + 150, height);
        beamGrad.addColorStop(0, "rgba(255, 255, 255, 0.12)");
        beamGrad.addColorStop(0.5, "rgba(45, 212, 191, 0.06)");
        beamGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(beamX, 0);
        ctx.lineTo(beamX + beamWidth, 0);
        ctx.lineTo(beamX + beamWidth + 180, height);
        ctx.lineTo(beamX + 180, height);
        ctx.closePath();
        ctx.fill();
      }

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

