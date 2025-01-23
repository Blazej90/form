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
      <h2 className="text-xl font-bold">
        {title || "Wprowadź nazwę formularza..."}
      </h2>

      <div className="mt-4">
        {fields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {field.label}
            </label>
            {field.type === "text" && (
              <input type="text" placeholder={field.placeholder} />
            )}
            {field.type === "textarea" && (
              <textarea placeholder={field.placeholder} />
            )}
            {field.type === "select" && field.options && (
              <select>
                {field.options.map((option: string, i: number) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {field.type === "checkbox" && <input type="checkbox" />}
            {field.type === "switch" && <input type="checkbox" />}
          </div>
        ))}
      </div>
    </div>
  );
};
