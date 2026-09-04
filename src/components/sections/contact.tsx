"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { portfolioConfig } from "@/lib/config"
import { OceanIcon } from "@/components/ui/ocean-icons"

import { useLanguage } from "@/context/language-context"

const contactInfo = [
  { icon: "mail",     label: "Email",    value: portfolioConfig.email,         href: `mailto:${portfolioConfig.email}` },
  { icon: "compass",  label: "Phone",    value: portfolioConfig.phone,         href: `tel:${portfolioConfig.phone.replace(/\s+/g, "")}` },
  { icon: "anchor",   label: "Location", value: portfolioConfig.location,      href: null },
  { icon: "github",   label: "GitHub",   value: "github.com/FregD156",         href: portfolioConfig.github },
]

export function Contact() {
  const { t } = useLanguage()
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
    <section className="py-28 relative overflow-hidden" id="contact">
      <div className="max-w-6xl mx-auto px-6 relative">

        {/* Header with Golden Pirate Hook Dock Pill */}
        <div className="mb-16">
          <div className="font-mono text-xs text-[#FDE68A] font-extrabold tracking-widest uppercase mb-2 flex items-center gap-2 bg-[#022433]/90 border border-[#FDE68A] px-4 py-1.5 poly-badge w-fit shadow-lg">
            <OceanIcon name="anchor" className="w-4 h-4 text-[#FDE68A] animate-bounce" />
            <span>{t("contact.tag")}</span>
          </div>

          <h2 className="font-fraunces text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">
            {t("contact.title")}
          </h2>
          <p className="font-jakarta text-sm md:text-base text-teal-100/80 max-w-[52ch] leading-relaxed font-medium">
            {t("contact.sub")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            {contactInfo.map((item, i) => {
              const inner = (
                <div className="flex items-center gap-4 p-4 poly-chamfer crystal-card border border-border/70 bg-card/80 backdrop-blur-md hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group">
                  <div className="flex items-center justify-center w-10 h-10 poly-badge border border-border bg-card/50 text-muted-foreground group-hover:text-primary group-hover:border-primary/40 transition-all duration-200 flex-shrink-0">
                    <OceanIcon name={item.icon} className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="postmark text-[10px] text-muted-foreground mb-0.5">{item.label}</div>
                    <div className="font-jakarta text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200">{item.value}</div>
                  </div>
                  {item.href && (
                    <OceanIcon name="external" className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0" />
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

            <div className="flex items-center gap-3 mt-3 px-1">
              <span className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0 shadow-sm" />
              <p className="postmark text-xs text-muted-foreground font-semibold">
                {t("contact.status")} · HANOI / KNUT / REMOTE
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
            <div className="p-6 md:p-8 poly-chamfer crystal-card border border-border/80 bg-card/80 backdrop-blur-md shadow-xl">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                  <OceanIcon name="trophy" className="w-12 h-12 text-primary" />
                  <h3 className="font-fraunces text-2xl font-bold">Message Transmission Sent!</h3>
                  <p className="font-jakarta text-sm text-muted-foreground max-w-[30ch]">
                    Thank you for reaching out. I will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="postmark text-xs text-primary hover:opacity-80 transition-opacity mt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-jakarta">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-name" className="postmark text-[11px] text-muted-foreground">{t("contact.name")}</label>
                      <Input id="contact-name" name="name" type="text" required placeholder="Nguyen Van A"
                        className="poly-badge border-border/80 bg-background/50 focus-visible:ring-primary text-sm" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-email" className="postmark text-[11px] text-muted-foreground">{t("contact.email")}</label>
                      <Input id="contact-email" name="email" type="email" required placeholder="name@domain.com"
                        className="poly-badge border-border/80 bg-background/50 focus-visible:ring-primary text-sm" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="postmark text-[11px] text-muted-foreground">{t("contact.message")}</label>
                    <Textarea id="contact-message" name="message" rows={5} required placeholder="..."
                      className="poly-badge border-border/80 bg-background/50 focus-visible:ring-primary text-sm resize-none" />
                  </div>

                  <Button
                    type="submit" disabled={sending}
                    className="postmark w-full poly-badge font-bold bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-300 py-3 text-xs"
                  >
                    {sending ? "Sending…" : t("contact.send")}
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

