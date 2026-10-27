import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { TranslationProvider } from "../contexts/TranslationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TranslationProvider>
          <div id="scroll-sentinel" className="scrollSentinel" aria-hidden="true" />
          <Header />
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
