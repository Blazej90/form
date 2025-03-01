"use client";

import React, { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Modal from "react-modal";
import { LeftPanel } from "@/components/left-panel/left-panel";
import { RightPanel } from "@/components/right-panel/right-panel";
import { Field } from "@/types/types";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [title, setTitle] = useState<string>("");
  const [fields, setFields] = useState<Field[]>([]);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const resetForm = () => {
    setFields([]);
    setTitle("");
    setActiveCard(null);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement("#__next");
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div id="__next">
            <div className="flex h-screen">
              <LeftPanel
                title={title}
                setTitle={setTitle}
                fields={fields}
                setFields={setFields}
                activeCard={activeCard}
                setActiveCard={setActiveCard}
              />
              <RightPanel title={title} fields={fields} resetForm={resetForm} />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
