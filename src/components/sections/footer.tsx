"use client"

import * as React from "react"
import { portfolioConfig } from "@/lib/config"
import { OceanIcon } from "@/components/ui/ocean-icons"

const stack = ["Next.js 16", "React 19", "Tailwind CSS v4", "Canvas 2D"]

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border/60 py-12 bg-background/90 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          {/* Brand in Fraunces */}
          <div>
            <a href="#" className="font-fraunces text-lg font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2">
              <OceanIcon name="wave" className="w-5 h-5 text-primary" />
              <span>Nguyen Thanh Duy</span>
              <span className="postmark text-[10px] text-primary">.dev</span>
            </a>
            <p className="font-jakarta text-xs text-muted-foreground mt-2 max-w-[44ch]">
              Crafted with{" "}
              {stack.map((s, i) => (
                <span key={s}>
                  <span className="text-foreground/80 font-medium">{s}</span>
                  {i < stack.length - 1 && <span className="text-primary/40 mx-1">·</span>}
                </span>
              ))}
              . Ocean Sunset Theme.
            </p>
          </div>

          {/* Links + copyright in Space Mono */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="flex gap-4">
              <a
                href={portfolioConfig.github} target="_blank" rel="noopener noreferrer"
                className="postmark text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <OceanIcon name="github" className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={`mailto:${portfolioConfig.email}`}
                className="postmark text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <OceanIcon name="mail" className="w-4 h-4" />
                Email
              </a>
              <a
                href={portfolioConfig.resumeUrl} target="_blank" rel="noopener noreferrer"
                className="postmark text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <OceanIcon name="terminal" className="w-4 h-4" />
                Resume
              </a>
            </div>
            <p className="postmark text-xs text-muted-foreground">
              © {year} {portfolioConfig.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

