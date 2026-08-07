import { Navbar } from "@/components/sections/navbar";
import { HeroOcean } from "@/components/sections/hero-ocean";
import { TechStrip } from "@/components/sections/tech-strip";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { MoodScrollController, MorphWaveDivider } from "@/components/mood-scroll";
import { OceanDepthCanvas } from "@/components/ocean-depth-canvas";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <OceanDepthCanvas />
      <MoodScrollController />

      <Navbar />
      <main className="flex-1 w-full" id="main-content">
        <HeroOcean />
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


