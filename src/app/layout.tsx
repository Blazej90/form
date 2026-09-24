import React from "react";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { LayoutClient } from "@/components/layout-client";
import "./globals.css";

const manrope = Manrope({
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
        className={`${manrope.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
