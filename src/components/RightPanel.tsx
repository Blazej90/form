"use client";

import React from "react";
import { Field } from "@/types/types";

interface RightPanelProps {
  title: string;
  fields: Field[];
}

export const RightPanel: React.FC<RightPanelProps> = ({ title, fields }) => {
  return (
    <div className="w-1/2 p-6">
      <h1 className="text-lg font-semibold">{title}</h1>
      {fields.map((field) => {
        if (!field.id) {
          console.error("Rendering field with ID: undefined");
          return null;
        }

        return (
          <div key={field.id} className="mb-4">
            <label className="block text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {/* Renderowanie różnych typów pól */}
            {field.type === "text" && (
              <input type="text" placeholder={field.placeholder} />
            )}
            {field.type === "textarea" && (
              <textarea placeholder={field.placeholder} />
            )}
            {field.type === "select" && (
              <select>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            )}
            {field.type === "checkbox" && (
              <input type="checkbox" checked={field.required} />
            )}
            {field.type === "switch" && (
              <input type="checkbox" checked={field.required} />
            )}
          </div>
        );
      })}
    </div>
  );
};
