import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background glow mesh (adaptable between dark/light themes) */}
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-screen h-screen bg-[radial-gradient(circle_800px_at_50%_200px,rgba(16,185,129,0.035),transparent_80%)] dark:bg-[radial-gradient(circle_800px_at_50%_200px,rgba(16,185,129,0.035),transparent_80%)] light:bg-[radial-gradient(circle_800px_at_50%_200px,rgba(5,150,105,0.025),transparent_80%)] pointer-events-none -z-10 transition-colors duration-300" />
      
      <Navbar />
      <main className="flex-1 w-full">
        <Hero />
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
