"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { portfolioConfig } from "@/lib/config"
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react"

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

const contactInfo = [
  { icon: Mail,       label: "Email",    value: portfolioConfig.email,         href: `mailto:${portfolioConfig.email}` },
  { icon: Phone,      label: "Phone",    value: portfolioConfig.phone,         href: `tel:${portfolioConfig.phone.replace(/\s+/g, "")}` },
  { icon: MapPin,     label: "Location", value: portfolioConfig.location,      href: null },
  { icon: GithubIcon, label: "GitHub",   value: "github.com/FregD156",         href: portfolioConfig.github },
]

export function Contact() {
  const [submitted, setSubmitted] = React.useState(false)
  const [sending,   setSending]   = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch(`https://formspree.io/f/${portfolioConfig.formspreeId}`, {
        method: "POST", body: data, headers: { Accept: "application/json" },
      })
      if (res.ok) { setSubmitted(true); form.reset() }
    } catch { form.submit() }
    finally { setSending(false) }
  }

  return (
    <section className="py-32 border-t border-border relative overflow-hidden" id="contact">
      {/* Warm glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-20%", left: "20%",
          width: "60vw", height: "60vw", maxWidth: "600px",
          background: "radial-gradient(circle, rgba(217,119,87,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative">

        {/* Header */}
        <div className="mb-16">
          <div className="overflow-hidden mb-3">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
            >
              Start a Conversation
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground max-w-[48ch] leading-relaxed"
          >
            Open to research collaborations, full-stack roles, and remote projects.
            Reach out and I will respond within 24 hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            {contactInfo.map((item, i) => {
              const Icon = item.icon
              const inner = (
                <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/85 backdrop-blur-md hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-card/50 text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-all duration-200 flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">{item.label}</div>
                    <div className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors duration-200">{item.value}</div>
                  </div>
                  {item.href && (
                    <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
                  )}
                </div>
              )
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  {item.href
                    ? <a href={item.href} className="block" {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>
                    : inner
                  }
                </motion.div>
              )
            })}

            {/* Availability indicator */}
            <div className="flex items-center gap-3 mt-3 px-1">
              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 animate-pulse" />
              <p className="text-xs text-muted-foreground">
                Currently open in Hanoi, KNUT (Korea), and fully remote.
              </p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-6 md:p-8 rounded-2xl border border-border bg-card/85 backdrop-blur-md">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                  <h3 className="text-xl font-bold">Message sent!</h3>
                  <p className="text-sm text-muted-foreground max-w-[30ch]">
                    Thanks for reaching out. I will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-primary hover:opacity-70 transition-opacity mt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-muted-foreground">Name</label>
                      <Input id="contact-name" name="name" type="text" required placeholder="Your name"
                        className="rounded-lg border-border bg-background/50 focus-visible:ring-primary text-sm" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-muted-foreground">Email</label>
                      <Input id="contact-email" name="email" type="email" required placeholder="you@example.com"
                        className="rounded-lg border-border bg-background/50 focus-visible:ring-primary text-sm" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-subject" className="text-xs font-semibold text-muted-foreground">Subject</label>
                    <Input id="contact-subject" name="subject" type="text" placeholder="Project, opportunity, collaboration..."
                      className="rounded-lg border-border bg-background/50 focus-visible:ring-primary text-sm" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-muted-foreground">Message</label>
                    <Textarea id="contact-message" name="message" rows={5} required placeholder="Tell me about your project..."
                      className="rounded-lg border-border bg-background/50 focus-visible:ring-primary text-sm resize-none" />
                  </div>

                  <Button
                    type="submit" disabled={sending}
                    className="w-full rounded-full font-semibold bg-primary hover:opacity-90 text-white shadow-[0_0_24px_rgba(217,119,87,0.15)] hover:shadow-[0_0_32px_rgba(217,119,87,0.35)] transition-all duration-300 cursor-pointer"
                  >
                    {sending ? "Sending…" : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
