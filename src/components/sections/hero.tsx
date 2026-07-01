"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  return (
    <section className="min-h-[100dvh] pt-[120px] flex items-center justify-center relative overflow-hidden" id="hero">
      <div className="max-w-6xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        
        {/* Hero copy content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start text-left"
        >
          <span className="text-xs font-mono font-semibold uppercase tracking-[0.22em] text-primary mb-4">
            STUDENT & DEVELOPER
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight md:leading-none mb-6">
            Building intelligent software & AI systems.
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[45ch] mb-8">
            A Software Engineering student with a 3.67 GPA, specializing in robust backend architectures and award-winning AI platforms.
          </p>
          <div className="flex gap-4">
            <a
              href="#projects"
              className={buttonVariants({
                size: "lg",
                className: "rounded-full font-semibold cursor-pointer px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all"
              })}
            >
              Selected Work
            </a>
            <a
              href="#contact"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "rounded-full font-semibold cursor-pointer px-6 hover:bg-accent/40 transition-colors"
              })}
            >
              Get in touch
            </a>
          </div>
        </motion.div>

        {/* Hero visual content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center items-center"
        >
          <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] group">
            <div className="absolute inset-0 border border-primary/20 rounded-2xl scale-[1.03] opacity-50 group-hover:scale-[1.05] group-hover:border-primary/40 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="w-full h-full rounded-2xl overflow-hidden border border-border shadow-2xl transition-transform duration-500 group-hover:translate-y-[-4px] group-hover:scale-[1.01] relative">
              <Image
                src="/assets/images/profile.jpg"
                alt="Nguyen Thanh Duy professional portrait"
                fill
                sizes="(max-width: 768px) 280px, 340px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
