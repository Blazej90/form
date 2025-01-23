"use client";

import React, { useState } from "react";
import { LeftPanel } from "@/components/LeftPanel";
import { RightPanel } from "@/components/RightPanel";
import { Field } from "@/types/types";

export const Layout: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [fields, setFields] = useState<Field[]>([]);

  return (
    <div className="flex h-screen">
      <LeftPanel
        title={title}
        setTitle={setTitle}
        fields={fields}
        setFields={setFields}
      />
      <RightPanel title={title} fields={fields} />
    </div>
  );
};
