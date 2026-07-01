"use client"

import * as React from "react"

export function Footer() {
  return (
    <footer className="py-8 border-t border-border mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
        <div>
          © 2026 Nguyen Thanh Duy. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a
            href="https://github.com/FregD156"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://drive.google.com/drive/folders/your-resume-placeholder"
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
