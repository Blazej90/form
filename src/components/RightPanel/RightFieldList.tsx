import React from "react";
import { Field } from "@/types/types";
import { FieldRenderer } from "./FieldRenderer";

interface FieldListProps {
  fields: Field[];
  onChange: (id: string, value: string | boolean) => void;
}

export const FieldList: React.FC<FieldListProps> = ({ fields, onChange }) => {
  return (
    <div>
      {fields.map((field) => (
        <FieldRenderer key={field.id} field={field} onChange={onChange} />
      ))}
    </div>
  );
};
