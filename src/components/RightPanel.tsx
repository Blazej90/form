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
        {fields.map((field) => (
          <div key={field.id} className="mb-6">
            {field.label && (
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  {field.label}{" "}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
              </div>
            )}
            {field.type === "text" && (
              <input
                type="text"
                placeholder={field.placeholder}
                className="w-full border border-gray-300 p-2 rounded"
              />
            )}
            {field.type === "textarea" && (
              <textarea
                placeholder={field.placeholder}
                className="w-full border border-gray-300 p-2 rounded"
              />
            )}
            {field.type === "select" && (
              <select className="w-full border border-gray-300 p-2 rounded">
                {field.options?.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {field.type === "checkbox" && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded"
                />
                <label className="ml-2 text-sm">Pole wyboru</label>
              </div>
            )}
            {field.type === "switch" && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded"
                />
                <label className="ml-2 text-sm">Przełącznik</label>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
