"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/i18n/language-provider";
import { LeftPanel } from "@/components/left-panel/left-panel";
import { RightPanel } from "@/components/right-panel/right-panel";
import { RotateHint } from "@/components/ui/rotate-hint";
import { Field } from "@/types/types";

export const LayoutClient: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [title, setTitle] = useState<string>("");
  const [fields, setFields] = useState<Field[]>([]);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  const resetForm = () => {
    setFields([]);
    setTitle("");
    setActiveCard(null);
  };

  useEffect(() => {
    setMounted(true);

    const handleOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    handleOrientation();

    window.addEventListener("resize", handleOrientation);
    window.addEventListener("orientationchange", handleOrientation);

    return () => {
      window.removeEventListener("resize", handleOrientation);
      window.removeEventListener("orientationchange", handleOrientation);
    };
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>
        {!mounted ? null : isPortrait ? (
          <RotateHint />
        ) : (
          <div className="flex h-screen bg-gradient-to-br from-lime-50 via-background to-emerald-50 dark:from-lime-950/25 dark:via-background dark:to-emerald-950/25">
            <LeftPanel
              title={title}
              setTitle={setTitle}
              fields={fields}
              setFields={setFields}
              activeCard={activeCard}
              setActiveCard={setActiveCard}
            />
            <RightPanel title={title} fields={fields} resetForm={resetForm} />
            {children}
          </div>
        )}
      </LanguageProvider>
    </ThemeProvider>
  );
};
