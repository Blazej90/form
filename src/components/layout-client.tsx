"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ThemeProvider } from "@/components/theme-provider";
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
  const [isPortrait, setIsPortrait] = useState<boolean>(true);

  const resetForm = () => {
    setFields([]);
    setTitle("");
    setActiveCard(null);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement("#__next");

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
    }
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div id="__next">
        {isPortrait ? (
          <RotateHint />
        ) : (
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
        )}
      </div>
    </ThemeProvider>
  );
};
