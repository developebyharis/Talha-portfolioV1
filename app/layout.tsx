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
  title: "Domi Adiwijaya | System Engineer & HomeLAB Specialist",
  description:
    "Server dashboard-inspired portfolio showcasing expertise in infrastructure engineering, Kubernetes, DevOps automation, and home lab architecture. Explore projects, skills, and system metrics.",
  keywords:
    "system engineer, homelab, kubernetes, devops, infrastructure, server administration, docker, automation",
  authors: [{ name: "Domi Adiwijaya" }],
  openGraph: {
    title: "Domi Adiwijaya | System Engineer & HomeLAB Specialist",
    description:
      "Explore my server dashboard portfolio featuring infrastructure projects and system engineering expertise.",
    type: "website",
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
