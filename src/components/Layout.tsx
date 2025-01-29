"use client";

import React, { ReactNode, useState } from "react";
import { LeftPanel } from "@/components/LeftPanel/LeftPanel";
import { RightPanel } from "@/components/RightPanel/RightPanel";
import { Field } from "@/types/types";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [title, setTitle] = useState<string>("");
  const [fields, setFields] = useState<Field[]>([]);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const resetForm = () => {
    setFields([]);
    setTitle("");
    setActiveCard(null);
  };

  return (
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
  );
};
