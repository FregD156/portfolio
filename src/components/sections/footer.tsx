"use client"

import * as React from "react"
import { portfolioConfig } from "@/lib/config"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="py-8 border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
        <div>
          © {currentYear} {portfolioConfig.name}. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a
            href={portfolioConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href={portfolioConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  )
}
