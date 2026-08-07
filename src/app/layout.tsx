import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";
import { SplashIntro } from "@/components/splash-intro";
import { OceanIconSprite } from "@/components/ui/ocean-icons";

const syne = Syne({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nguyen Thanh Duy | Software Engineer & AI Builder",
  description:
    "Portfolio of Nguyen Thanh Duy - Software Engineering student at UTT, GPA 3.64, award-winning AI system builder & backend developer.",
  keywords: [
    "Nguyen Thanh Duy",
    "Software Engineer",
    "Portfolio",
    "Vietnam",
    "AI Developer",
    "Backend Engineer",
    "UTT",
    "FregD156",
  ],
  authors: [{ name: "Nguyen Thanh Duy", url: "https://github.com/FregD156" }],
  robots: "index, follow",
  openGraph: {
    type: "profile",
    title: "Nguyen Thanh Duy | Software Engineer & AI Builder",
    description:
      "Software Engineering student building AI systems and robust backends. 3rd Place - AI for Social Challenge.",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-background text-foreground antialiased grain`}
      >
        <OceanIconSprite />
        <SplashIntro />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}



