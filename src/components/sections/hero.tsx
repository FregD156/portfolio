"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import { Mail, Phone, FileText, ArrowRight } from "lucide-react"
import { portfolioConfig } from "@/lib/config"

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

const socialLinks = [
  { icon: GithubIcon, label: "GitHub",  href: portfolioConfig.github,                              external: true  },
  { icon: Mail,       label: "Email",   href: `mailto:${portfolioConfig.email}`,                   external: false },
  { icon: Phone,      label: "Phone",   href: `tel:${portfolioConfig.phone.replace(/\s+/g, "")}`, external: false },
  { icon: FileText,   label: "Resume",  href: portfolioConfig.resumeUrl,                           external: true  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
} as const
const item = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
} as const

export function Hero() {
  const [text, setText] = React.useState("")
  const full = "Software Engineer & AI Builder"

  React.useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      if (i <= full.length) { setText(full.slice(0, i)); i++ }
      else clearInterval(t)
    }, 48)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      className="min-h-[100dvh] flex items-center justify-center relative overflow-hidden"
      id="hero"
      style={{ paddingTop: "68px" }}
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      {/* Warm glow top-center */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%", left: "50%", transform: "translateX(-50%)",
          width: "80vw", height: "60vh",
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(217,119,87,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-16">

        {/* ── Left copy ───────────────────────────────────────────── */}
        <motion.div
          variants={container} initial="hidden" animate="visible"
          className="flex flex-col items-start text-left"
        >
          {/* Status pill */}
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Headline - max 2 lines */}
          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tighter leading-[1.06] mb-4"
          >
            <span className="gradient-text">Engineer</span> building<br />
            intelligent systems.
          </motion.h1>

          {/* Subtext - <= 20 words */}
          <motion.p
            variants={item}
            className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-[40ch] mb-8"
          >
            UTT Software Engineering student. GPA 3.64. Backends, AI pipelines, and award-winning products.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex gap-3 flex-wrap mb-8">
            <a
              href="#projects"
              className={buttonVariants({
                size: "lg",
                className: "rounded-full font-semibold cursor-pointer px-6 bg-primary hover:opacity-90 text-white shadow-[0_0_28px_rgba(217,119,87,0.25)] hover:shadow-[0_0_36px_rgba(217,119,87,0.4)] transition-all duration-300 group",
              })}
            >
              Selected Work
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "rounded-full font-semibold cursor-pointer px-6 border-border hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-300",
              })}
            >
              Get in touch
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={item} className="flex gap-2.5 items-center">
            {socialLinks.map(({ icon: Icon, label, href, external }) => (
              <a
                key={label} href={href} aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-card/40 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/8 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
            <div className="w-px h-5 bg-border mx-1" />
            <span className="text-xs font-mono text-muted-foreground">Hanoi, VN</span>
          </motion.div>
        </motion.div>

        {/* ── Right: Profile visual ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center items-center"
        >
          <div className="relative">
            {/* Outer glow rings */}
            <div className="absolute -inset-4 rounded-[2rem] border border-primary/10" />
            <div className="absolute -inset-8 rounded-[2.5rem] border border-primary/5" />

            {/* Slow-spinning dashed ring */}
            <div
              className="absolute -inset-6 rounded-[2.2rem] border border-dashed border-primary/12 spin-slow"
            />

            {/* Photo */}
            <div className="relative w-[272px] h-[272px] md:w-[336px] md:h-[336px] rounded-[1.5rem] overflow-hidden border border-border shadow-[0_0_60px_rgba(217,119,87,0.1)] group">
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src="/assets/images/profile.jpeg"
                alt="Nguyen Thanh Duy - Software Engineer"
                fill sizes="(max-width: 768px) 272px, 336px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                priority
              />
            </div>

            {/* Badge: GPA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="absolute -right-4 md:-right-8 top-6 bg-card border border-border rounded-xl px-4 py-3 shadow-xl backdrop-blur-sm"
            >
              <div className="text-[10px] font-mono text-muted-foreground mb-0.5">GPA</div>
              <div className="text-xl font-extrabold text-primary leading-none">3.64</div>
              <div className="text-[10px] font-mono text-muted-foreground mt-0.5">UTT · Excellent</div>
            </motion.div>

            {/* Badge: Award */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -left-4 md:-left-8 bottom-8 bg-card border border-border rounded-xl px-4 py-3 shadow-xl backdrop-blur-sm"
            >
              <div className="text-[10px] font-mono text-muted-foreground mb-0.5">Award</div>
              <div className="text-sm font-bold text-primary leading-none">3rd Place</div>
              <div className="text-[10px] font-mono text-muted-foreground mt-0.5">AI for Social</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.18em]">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary/40 to-transparent" />
      </motion.div>
    </section>
  )
}
