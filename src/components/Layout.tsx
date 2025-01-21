"use client";

import { useState } from "react";
import { LeftPanel } from "@/components/LeftPanel";
import { RightPanel } from "@/components/RightPanel";

export const Layout: React.FC = () => {
  const [title, setTitle] = useState("");

  return (
    <div className="flex h-screen">
      <LeftPanel title={title} setTitle={setTitle} />
      <RightPanel title={title} />
    </div>
  );
};
