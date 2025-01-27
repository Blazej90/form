import React from "react";
import { Field } from "@/types/types";
import { FieldCard } from "./FieldCard";

interface FieldListProps {
  fields: Field[];
  onUpdateField: (id: string, updatedField: Field) => void;
  onRemoveField: (id: string) => void;
}

export const FieldList: React.FC<FieldListProps> = ({
  fields,
  onUpdateField,
  onRemoveField,
}) => {
  return (
    <>
      {fields.map((field) => (
        <FieldCard
          key={field.id}
          field={field}
          onUpdateField={(updatedField) =>
            onUpdateField(field.id, updatedField)
          }
          onRemoveField={() => onRemoveField(field.id)}
        />
      ))}
    </>
  );
};
