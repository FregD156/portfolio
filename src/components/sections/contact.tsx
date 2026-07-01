"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export function Contact() {
  const info = [
    { label: "Email", value: "nguyentduy156@gmail.com", href: "mailto:nguyentduy156@gmail.com" },
    { label: "Phone", value: "+84 866 479 117", href: "tel:+84866479117" },
    { label: "Location", value: "Hanoi, Vietnam" },
    { label: "GitHub", value: "github.com/FregD156", href: "https://github.com/FregD156" }
  ]

  return (
    <section className="py-24 border-t border-border" id="contact">
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
            {info.map(item => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-base md:text-lg font-medium text-foreground hover:text-primary transition-colors inline-block w-fit"
                    {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="text-base md:text-lg font-medium text-foreground inline-block">
                    {item.value}
                  </span>
                )}
              </div>
            ))}
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
                action="https://formspree.io/f/your-formspree-id-placeholder"
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
                  className="w-full rounded-full font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all cursor-pointer"
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
