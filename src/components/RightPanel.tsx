"use client";

interface RightPanelProps {
  title: string;
}

export const RightPanel: React.FC<RightPanelProps> = ({ title }) => {
  return (
    <div className="w-1/2 p-6">
      <h2 className="text-xl font-bold">{title || "Tytuł formularza"}</h2>
    </div>
  );
};
