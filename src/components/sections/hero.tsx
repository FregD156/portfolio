"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import { Mail, Phone, FileText } from "lucide-react"
import { portfolioConfig } from "@/lib/config"

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

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
            A Software Engineering student with a 3.64 GPA, specializing in robust backend architectures and award-winning AI platforms.
          </p>
          <div className="flex gap-4">
            <a
              href="#projects"
              className={buttonVariants({
                size: "lg",
                className: "rounded-full font-semibold cursor-pointer px-6 bg-primary hover:bg-volt hover:text-black dark:hover:text-black shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(163,230,53,0.35)] transition-all duration-300"
              })}
            >
              Selected Work
            </a>
            <a
              href="#contact"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "rounded-full font-semibold cursor-pointer px-6 hover:border-volt hover:text-volt transition-colors duration-300"
              })}
            >
              Get in touch
            </a>
          </div>
          
          {/* Telemetry Icon Bar */}
          <div className="flex gap-4 items-center mt-8 pl-1">
            <a
              href={portfolioConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card/40 text-muted-foreground hover:text-volt hover:border-volt hover:shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:-translate-y-0.5 hover:rotate-6 transition-all duration-300 cursor-pointer"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${portfolioConfig.email}`}
              aria-label="Email"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card/40 text-muted-foreground hover:text-volt hover:border-volt hover:shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:-translate-y-0.5 hover:rotate-6 transition-all duration-300 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`tel:${portfolioConfig.phone.replace(/\s+/g, "")}`}
              aria-label="Phone"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card/40 text-muted-foreground hover:text-volt hover:border-volt hover:shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:-translate-y-0.5 hover:rotate-6 transition-all duration-300 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={portfolioConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card/40 text-muted-foreground hover:text-volt hover:border-volt hover:shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:-translate-y-0.5 hover:rotate-6 transition-all duration-300 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
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
                src="/assets/images/profile.jpeg"
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
