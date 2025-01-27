import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

interface LeftPanelHeaderProps {
  title: string;
  setTitle: (value: string) => void;
  onAddCard: () => void;
}

export const LeftPanelHeader: React.FC<LeftPanelHeaderProps> = ({
  title,
  setTitle,
  onAddCard,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Kreator formularza</h1>
        <ModeToggle />
      </div>
      <Input
        placeholder="Wprowdź nazwę formularza"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4"
      />
      <Button
        onClick={onAddCard}
        className="mb-6 px-4 py-2 bg-teal-500 dark:bg-teal-600 hover:bg-teal-600 dark:hover:bg-teal-700 text-white text-sm font-semibold rounded-md transition-colors"
      >
        Nowa karta
      </Button>
    </div>
  );
};
