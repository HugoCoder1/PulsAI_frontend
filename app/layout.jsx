import React from "react";
import { Unbounded, Ubuntu } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});

export const metadata = {
  title: "PulsAI - CRM Intelligent",
  description:
    "Plateforme CRM intelligente combinant IA conversationnelle, gestion de tickets et automatisation marketing",
  generator: "PulsAI",
};

export const viewport = {
  themeColor: "#3590E3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${unbounded.variable} ${ubuntu.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
