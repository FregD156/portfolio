"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { portfolioConfig } from "@/lib/config"
import { Mail, Phone, MapPin } from "lucide-react"

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

export function Contact() {
  const info = [
    { label: "Email", value: portfolioConfig.email, href: `mailto:${portfolioConfig.email}`, icon: Mail },
    { label: "Phone", value: portfolioConfig.phone, href: `tel:${portfolioConfig.phone.replace(/\s+/g, "")}`, icon: Phone },
    { label: "Location", value: portfolioConfig.location, icon: MapPin },
    { label: "GitHub", value: portfolioConfig.github.replace("https://", ""), href: portfolioConfig.github, icon: GithubIcon }
  ]

  return (
    <section className="py-28 border-t border-border bg-card/45 dark:bg-card/20" id="contact">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* Contact Info block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col text-left"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-6">Start a Conversation</h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-[45ch]">
            Whether you want to discuss AI systems, research collaborations, open full-stack roles, or even a game of badminton, feel free to reach out. I am open to opportunities in Hanoi, KNUT (Korea), and remote projects.
          </p>
          
          <div className="space-y-6">
            {info.map(item => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex gap-4 items-center group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card/40 text-muted-foreground group-hover:text-volt group-hover:border-volt group-hover:shadow-[0_0_10px_rgba(163,230,53,0.25)] group-hover:rotate-6 transition-all duration-300 pointer-events-none">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-base font-medium text-foreground hover:text-volt transition-colors inline-block w-fit cursor-pointer"
                        {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-base font-medium text-foreground inline-block">
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Contact Form block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="border border-border bg-card/40 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <form
                className="space-y-6"
                action={`https://formspree.io/f/${portfolioConfig.formspreeId}`}
                method="POST"
              >
                <div className="flex flex-col gap-2 text-left">
                  <label htmlFor="form-name" className="text-xs font-semibold text-muted-foreground">
                    Name
                  </label>
                  <Input
                    type="text"
                    id="form-name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="rounded-lg border-border focus-visible:ring-primary focus-visible:ring-offset-background"
                  />
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <label htmlFor="form-email" className="text-xs font-semibold text-muted-foreground">
                    Email
                  </label>
                  <Input
                    type="email"
                    id="form-email"
                    name="email"
                    required
                    placeholder="email@example.com"
                    className="rounded-lg border-border focus-visible:ring-primary focus-visible:ring-offset-background"
                  />
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <label htmlFor="form-message" className="text-xs font-semibold text-muted-foreground">
                    Message
                  </label>
                  <Textarea
                    id="form-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Describe your project, question, or opportunity..."
                    className="rounded-lg border-border focus-visible:ring-primary focus-visible:ring-offset-background resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full font-semibold bg-primary hover:bg-volt hover:text-black dark:hover:text-black shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(163,230,53,0.35)] transition-all duration-300 cursor-pointer"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </section>
  )
}
