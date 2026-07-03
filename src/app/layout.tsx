import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { CustomCursor } from "@/components/custom-cursor";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Nguyen Thanh Duy | Software Engineer",
  description:
    "Portfolio of Nguyen Thanh Duy - a Software Engineering student at UTT, specializing in backend architectures, AI systems, and modern web platforms. Award-winning developer, GPA 3.64.",
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
    title: "Nguyen Thanh Duy | Software Engineer",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-background text-foreground antialiased grain`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <CustomCursor />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
