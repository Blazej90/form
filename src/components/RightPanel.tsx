"use client";

import React from "react";
import { Field } from "@/types/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RightPanelProps {
  title: string;
  fields: Field[];
}

export const RightPanel: React.FC<RightPanelProps> = ({ title, fields }) => {
  return (
    <div className="w-1/2 p-6 overflow-y-auto">
      <Card className="shadow-md border border-gray-300 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
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
                  {field.type === "text" && (
                    <input
                      type="text"
                      placeholder={field.placeholder || ""}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                  {field.type === "textarea" && (
                    <textarea
                      placeholder={field.placeholder || ""}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                  {field.type === "select" && (
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="" disabled hidden>
                        Wybierz opcję
                      </option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                    </select>
                  )}
                  {field.type === "checkbox" && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-500"
                      />
                      <label className="text-sm">Opcja wyboru</label>
                    </div>
                  )}
                  {field.type === "switch" && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-500"
                      />
                      <label className="text-sm">Przełącznik</label>
                    </div>
                  )}
                </div>
              );
            })}
            <Button
              type="submit"
              className="mb-6 px-4 py-2 bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-800 text-white text-sm font-semibold rounded-md transition-colors"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
