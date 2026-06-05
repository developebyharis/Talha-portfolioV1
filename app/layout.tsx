import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore: side-effect import for global CSS
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Talha Khan | Embeded System Engineer",
  description:
    "Terminal-inspired portfolio showcasing low-level firmware engineering, embedded systems (STM32, FreeRTOS), bare-metal computing, and multi-node HomeLAB virtualization clusters.",
  keywords: [
    "embedded systems",
    "firmware engineering",
    "stm32",
    "freertos",
    "bare-metal",
    "homelab",
    "kubernetes",
    "microservices",
    "systems engineer",
    "nextjs 15",
  ],
  authors: [{ name: "Talha Khan" }],
  openGraph: {
    title: "Talha Khan | Embeded System Engineer",
    description:
      "Explore my terminal-inspired systems portfolio featuring embedded firmware, bare-metal development, and advanced cluster virtualization.",
    type: "website",
    url: "https://engineertalha.vercel.app/", 
    siteName: "Talha Khan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Talha Khan | Embeded System Engineer",
    description:
      "Terminal-inspired portfolio showcasing embedded systems, FreeRTOS, and multi-node HomeLAB virtualization clusters.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
