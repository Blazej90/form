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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div id="__next">
        <div className="md:hidden">
          <RotateHint />
        </div>

        <div className="hidden md:flex h-screen">
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
  );
};
