import React from "react";

interface FormTitleProps {
  title: string;
}

export const FormTitle: React.FC<FormTitleProps> = ({ title }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
};
