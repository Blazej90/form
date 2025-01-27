"use client";

import React, { useState } from "react";
import { LeftPanel } from "@/components/LeftPanel/LeftPanel";
import { RightPanel } from "@/components/RightPanel/RightPanel";
import { Field } from "@/types/types";

export const Layout: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [fields, setFields] = useState<Field[]>([]);
  const [activeCard, setActiveCard] = useState<string | null>(null);

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
      <RightPanel title={title} fields={fields} />
    </div>
  );
};
