import React from "react";
import { Field } from "@/types/types";
import { FieldRenderer } from "./field-renderer";

interface FieldListProps {
  fields: Field[];
  formData: { [key: string]: string | boolean | string[] };
  onChange: (id: string, value: string | boolean | string[]) => void;
}

export const FieldList: React.FC<FieldListProps> = ({
  fields,
  formData,
  onChange,
}) => {
  return (
    <div>
      {fields.map((field) => (
        <FieldRenderer
          key={field.id}
          field={field}
          onChange={onChange}
          value={formData[field.id] || ""}
        />
      ))}
    </div>
  );
};
