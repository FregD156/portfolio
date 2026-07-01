"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export function Experience() {
  const items = [
    {
      time: "12 Months",
      role: "Business Operations & Soft Skills Consultant",
      company: "Freelance / Independent",
      desc: "Managed operations, content updates, customer success services, and technical workflow setup for private business clients. Developed communication, problem-solving, and administrative execution skills."
    },
    {
      time: "11 Months",
      role: "Front of House Specialist & Financial Assistant",
      company: "Le Monde Steak & Cuốn 37 (Golden Gate Group)",
      desc: "Supported daily financial tracking and transaction logs. Awarded \"Excellent Employee of the Month\" three times across both establishments for exceptional performance, team coordination, and customer relations."
    },
    {
      time: "8 Months",
      role: "Badminton Coach",
      company: "Badminton Academy",
      desc: "Leveraged athletic background (regional silver medalist) to formulate personalized training routines. Coached junior and adult student groups, refining leadership, motivation, and clear communication techniques under athletic pressure."
    }
  ]

  return (
    <section className="py-28 border-t border-border" id="experience">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-16 text-center">
          <span className="text-xs font-mono font-semibold uppercase tracking-[0.22em] text-primary mb-4 block">
            TIMELINE
          </span>
          <h2 className="text-3xl font-bold tracking-tight">Leadership & Background</h2>
        </div>

        <div className="relative border-l border-border pl-6 ml-4 space-y-12">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Timeline dot marker */}
              <div className="absolute left-[-29px] top-6 w-2.5 h-2.5 rounded-full bg-background border-2 border-primary z-10 transition-all duration-300 group-hover:scale-130 group-hover:bg-primary" />
              
              <Card className="border border-border bg-card/40 backdrop-blur-sm hover:border-border-hover hover:bg-card-hover/60 transition-all duration-300">
                <CardContent className="p-6 flex flex-col text-left">
                  <span className="text-[10px] font-mono font-semibold text-primary uppercase tracking-wide mb-2 block">
                    {item.time}
                  </span>
                  <h3 className="text-xl font-bold mb-1">{item.role}</h3>
                  <h4 className="text-xs font-mono font-medium text-muted-foreground mb-4">
                    {item.company}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
