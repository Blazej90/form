"use client";

import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";

interface LeftPanelProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({ title, setTitle }) => {
  return (
    <div className="w-1/2 p-6 border-r border-gray-300 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Tytuł formularza</h1>
        <ModeToggle />
      </div>
      <Input
        placeholder="My form"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full"
      />
    </div>
  );
};
