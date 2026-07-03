"use client"

import * as React from "react"
import { Mail } from "lucide-react"
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

const stack = ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          {/* Brand */}
          <div>
            <a href="#" className="text-base font-bold font-mono text-foreground hover:text-primary transition-colors">
              ~/Duy.dev
            </a>
            <p className="text-xs text-muted-foreground mt-1.5 max-w-[42ch]">
              Built with{" "}
              {stack.map((s, i) => (
                <span key={s}>
                  <span className="text-foreground/60">{s}</span>
                  {i < stack.length - 1 && <span className="text-border mx-1">·</span>}
                </span>
              ))}
              . Deployed on Vercel.
            </p>
          </div>

          {/* Links + copyright */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="flex gap-4">
              <a
                href={portfolioConfig.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                GitHub
              </a>
              <a
                href={`mailto:${portfolioConfig.email}`}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Email
              </a>
              <a
                href={portfolioConfig.resumeUrl} target="_blank" rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Resume
              </a>
            </div>
            <p className="text-xs font-mono text-muted-foreground">
              © {year} {portfolioConfig.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
