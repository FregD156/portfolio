import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { TechStrip } from "@/components/sections/tech-strip";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Background3D } from "@/components/background-canvas";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* 3D background */}
      <Background3D />

      {/* Ambient top glow */}
      <div
        className="fixed pointer-events-none -z-10"
        style={{
          top: "-15%", left: "50%", transform: "translateX(-50%)",
          width: "100vw", height: "80vh",
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(217,119,87,0.05) 0%, transparent 70%)",
        }}
      />

      <Navbar />
      <main className="flex-1 w-full" id="main-content">
        <Hero />
        <TechStrip />
        <Stats />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
