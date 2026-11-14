import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Atmosphere from "../components/Atmosphere";
import { TranslationProvider } from "../contexts/TranslationContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rudio - Desenvolvedor Full Stack",
  description: "Portfólio de Guilherme Rudio, desenvolvedor full stack.",
  openGraph: {
    title: "Rudio - Desenvolvedor Full Stack",
    description: "Portfólio de Guilherme Rudio, desenvolvedor full stack.",
    images: [{ url: "/guilherme-rudio.png", alt: "Guilherme Rudio" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Atmosphere />
        <TranslationProvider>
          <div id="scroll-sentinel" className="scrollSentinel" aria-hidden="true" />
          <Header />
          {children}
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  );
}
