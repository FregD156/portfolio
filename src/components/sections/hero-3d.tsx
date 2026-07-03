"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

/* ── SCROLLING CODE CANVAS TEXTURE ──────────────────────────────────── */
function CodeScreenTexture() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const textureRef = React.useRef<THREE.CanvasTexture | null>(null)
  const linesRef = React.useRef<string[]>([])

  React.useEffect(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 512
    canvasRef.current = canvas

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Generate random code line matrix
    const codeLines = [
      "import { system } from 'duy-ai'",
      "const api = new BackendAPI()",
      "function initViewport() {",
      "  const ctx = canvas.getContext('3d')",
      "  matrix.bindShaders(vertexSrc)",
      "  console.log('Context ready')",
      "}",
      "const gpa = 3.64 // UTT Excellent",
      "const award = 'AI For Social'",
      "class AgentWorkflow {",
      "  async execute(task) {",
      "    await db.saveState(task)",
      "    return new Response('ok')",
      "  }",
      "}",
    ]

    linesRef.current = codeLines

    const texture = new THREE.CanvasTexture(canvas)
    textureRef.current = texture
  }, [])

  useFrame((state) => {
    const canvas = canvasRef.current
    const texture = textureRef.current
    if (!canvas || !texture) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw background
    ctx.fillStyle = "#141414"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Render scrolling text
    ctx.font = "bold 16px monospace"
    ctx.fillStyle = "#D97757"

    const time = state.clock.getElapsedTime()
    const offset = (time * 60) % 24

    const lines = linesRef.current
    for (let i = 0; i < 25; i++) {
      const line = lines[(i + Math.floor(time * 2)) % lines.length]
      ctx.fillText(line, 20, i * 24 - offset)
    }

    texture.needsUpdate = true
  })

  return textureRef.current ? (
    <meshBasicMaterial map={textureRef.current} />
  ) : (
    <meshBasicMaterial color="#1c1c1c" />
  )
}

/* ── 3D COMPUTER WORKSTATION ────────────────────────────────────────── */
function Workstation() {
  const leftHandRef = React.useRef<THREE.Mesh>(null)
  const rightHandRef = React.useRef<THREE.Mesh>(null)
  const groupRef = React.useRef<THREE.Group>(null)

  // Typing & slow rotation animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (leftHandRef.current) {
      leftHandRef.current.position.y = Math.sin(time * 24) * 0.04 + 0.05
      leftHandRef.current.position.z = Math.cos(time * 12) * 0.05 - 0.2
    }
    if (rightHandRef.current) {
      rightHandRef.current.position.y = Math.cos(time * 20) * 0.04 + 0.05
      rightHandRef.current.position.z = Math.sin(time * 16) * 0.05 - 0.2
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05 // slow background orbit rotation
    }
  })

  return (
    <group ref={groupRef} position={[1.1, -0.6, -0.2]}>
      {/* Desk Base */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>

      {/* Monitor Stand */}
      <mesh position={[0, 0.35, -0.6]}>
        <cylinderGeometry args={[0.04, 0.04, 0.7]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Monitor Screen Frame */}
      <group position={[0, 0.8, -0.6]}>
        <mesh>
          <boxGeometry args={[1.6, 0.9, 0.08]} />
          <meshStandardMaterial color="#222222" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Code Canvas Screen */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[1.5, 0.8]} />
          <CodeScreenTexture />
        </mesh>
      </group>

      {/* Keyboard */}
      <mesh position={[0, 0.04, -0.2]}>
        <boxGeometry args={[0.8, 0.03, 0.3]} />
        <meshStandardMaterial color="#2b2b2b" roughness={0.5} />
      </mesh>

      {/* Glowing keyboard details */}
      <mesh position={[0, 0.05, -0.2]}>
        <boxGeometry args={[0.76, 0.02, 0.26]} />
        <meshStandardMaterial color="#D97757" emissive="#D97757" emissiveIntensity={0.6} wireframe />
      </mesh>

      {/* Coder Wireframe Figure */}
      <group position={[0, 0.5, 0.5]}>
        {/* Head */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#D97757" emissive="#D97757" emissiveIntensity={0.25} wireframe />
        </mesh>
        {/* Torso */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.2, 0.6, 8]} />
          <meshStandardMaterial color="#D97757" emissive="#D97757" emissiveIntensity={0.15} wireframe />
        </mesh>

        {/* Floating Hands Typing (Animated) */}
        <mesh ref={leftHandRef} position={[-0.25, 0.05, -0.2]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#D97757" emissiveIntensity={0.8} />
        </mesh>
        <mesh ref={rightHandRef} position={[0.25, 0.05, -0.2]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#D97757" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* Warm Orange Spotlight (Desk Lamp glow) */}
      <spotLight
        position={[0, 2.5, 0]}
        angle={0.6}
        penumbra={0.5}
        intensity={20}
        color="#D97757"
        castShadow
      />
    </group>
  )
}

/* ── FLOATING CODE DUST PARTICLES ───────────────────────────────────── */
function CodeParticles() {
  const pointsRef = React.useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.03) * 0.05
    }
  })

  // Generate 80 random matrix dots
  const [positions] = React.useState(() => {
    const arr = new Float32Array(80 * 3)
    for (let i = 0; i < 80; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 4
      arr[i * 3 + 1] = (Math.random() - 0.5) * 3 + 0.5
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return arr
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#D97757"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  )
}

/* ── MAIN CANVAS ────────────────────────────────────────────────────── */
export default function Hero3D() {
  return (
    <div className="fixed inset-0 w-screen h-screen -z-20 pointer-events-none opacity-[0.12] transition-opacity duration-1000">
      <Canvas
        camera={{ position: [3, 2, 3], fov: 45 }}
        gl={{ antialias: true }}
      >
        {/* Soft fill lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#D97757" />
        <pointLight position={[-5, 5, -5]} intensity={0.5} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
          <Workstation />
          <CodeParticles />
        </Float>
      </Canvas>
    </div>
  )
}
