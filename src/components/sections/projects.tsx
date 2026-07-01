"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"

export function Projects() {
  const projects = [
    {
      id: "eduguide",
      name: "EduGuide AI",
      tagline: "AI University Recommendation System",
      award: "3rd Place",
      tag: "Award Winner",
      description: "An intelligent recommendation system designed to assist high school students in selecting the most optimal universities and academic majors based on personalized profiles and data analysis.",
      features: [
        "Comprehensive data mapping and algorithmic processing for 30+ academic majors.",
        "Built by a core member of a key scientific research team.",
        "Responsive, modern frontend user interface for intuitive exploration."
      ],
      tech: ["Python", "Node.js", "AI Models", "JavaScript"],
      image: "/assets/images/projects/eduguide-ai.jpg",
      codeUrl: "https://github.com/FregD156/AI.git",
      demoUrl: "http://www.xettuyen.site",
      reverse: false
    },
    {
      id: "topikw",
      name: "TOPIK W",
      tagline: "Korean Proficiency Training Web Client",
      tag: "Web Application",
      description: "A specialized language preparation web client featuring vocabulary marathons and structured mock practice modules for TOPIK I and TOPIK II levels.",
      features: [
        "Interactive database supporting high-volume vocabulary quizzes (50 to 350+ questions).",
        "Optimized, lightweight web client ensuring fast rendering speeds for rigorous study sessions.",
        "Fully responsive layouts tailored for mobile and web screens."
      ],
      tech: ["JavaScript", "Vercel", "HTML5/CSS3"],
      image: "/assets/images/projects/topikw-demo.jpg",
      codeUrl: null,
      demoUrl: "https://topikwfregd.vercel.app",
      reverse: true
    }
  ]

  return (
    <section className="py-24 border-t border-border" id="projects">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-left">
          <h2 className="text-3xl font-bold tracking-tight">Selected Projects</h2>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                project.reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              
              {/* Project copy details */}
              <div className={`flex flex-col text-left ${project.reverse ? "lg:order-2" : "lg:order-1"}`}>
                <div className="flex gap-2.5 items-center mb-4">
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    {project.tag}
                  </span>
                  {project.award && (
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-foreground bg-badge-bg border border-border px-2.5 py-0.5 rounded-full">
                      {project.award}
                    </span>
                  )}
                </div>
                <h3 className="text-3xl font-bold tracking-tight leading-none mb-1">
                  {project.name}
                </h3>
                <h4 className="text-base font-medium text-muted-foreground mb-6">
                  {project.tagline}
                </h4>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>
                <ul className="space-y-2 mb-8 list-none">
                  {project.features.map(feature => (
                    <li key={feature} className="text-xs md:text-sm text-muted-foreground relative pl-5">
                      <span className="absolute left-0 text-primary">•</span> {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className="text-[10px] md:text-xs font-mono text-muted-foreground border border-border px-2.5 py-1 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.codeUrl ? (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        variant: "outline",
                        className: "rounded-full font-semibold border border-border hover:bg-accent/40 cursor-pointer"
                      })}
                    >
                      Source Code
                    </a>
                  ) : (
                    <span
                      className={buttonVariants({
                        variant: "outline",
                        className: "rounded-full font-semibold cursor-not-allowed text-muted-foreground border border-border bg-transparent opacity-50"
                      })}
                    >
                      Private Code
                    </span>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants({
                        className: "rounded-full font-semibold px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all cursor-pointer"
                      })}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Project graphical container */}
              <div
                className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-2xl group cursor-pointer ${
                  project.reverse ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                <Image
                  src={project.image}
                  alt={`${project.name} Interface Dashboard Mockup`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
