import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import BackToTop from '@/components/ui/BackToTop';
import ScrollToTop from "@/components/layout/ScrollToTop";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import GlowingLinesBackground from "@/components/layout/GlowingLinesBackground";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "SafeMax Fire & Safety | SIRA & DCD Approved Integrator",
  description: "Leading Fire Engineering and SIRA Security Systems provider in Dubai. ISO 9001 Certified.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${outfit.variable}`}>
        <ScrollToTop />
        <GlowingLinesBackground />
        <Preloader />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-0 md:pt-16">
            {children}
          </main>
          <BackToTop />
          <FloatingWhatsApp /> {/* Added component */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
