"use client";

import React from "react";
import { Field } from "@/types/types";
import { FieldRenderer } from "./field-renderer";
import { ValidationErrorKey } from "@/lib/validation";

interface RightFieldListProps {
  fields: Field[];
  formData: { [key: string]: string | boolean | string[] };
  errors: Record<string, ValidationErrorKey>;
  onChange: (id: string, value: string | boolean | string[]) => void;
}

export const RightFieldList: React.FC<RightFieldListProps> = ({
  fields,
  formData,
  errors,
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
          error={errors[field.id]}
        />
      ))}
    </div>
  );
};
