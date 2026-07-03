"use client"

import React from "react"
import dynamic from "next/dynamic"

const Hero3D = dynamic(() => import("./sections/hero-3d"), { ssr: false })

export function Background3D() {
  return <Hero3D />
}
