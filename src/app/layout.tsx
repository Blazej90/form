import React from "react";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { LayoutClient } from "@/components/layout-client";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased tracking-tight`}
      >
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
