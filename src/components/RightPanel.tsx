"use client";

import React from "react";
import { Field } from "@/types/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

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
                    <Input
                      type="text"
                      placeholder={field.placeholder || ""}
                      className="w-full"
                    />
                  )}
                  {field.type === "textarea" && (
                    <Textarea
                      placeholder={field.placeholder || ""}
                      className="w-full"
                    />
                  )}
                  {field.type === "select" && (
                    <Select onValueChange={(value) => console.log(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  {field.type === "checkbox" && (
                    <div className="flex items-center space-x-2">
                      <Checkbox id={field.id} />
                      <label htmlFor={field.id} className="text-sm">
                        {field.label}
                      </label>
                    </div>
                  )}
                  {field.type === "switch" && (
                    <div className="flex items-center space-x-2">
                      <Switch />
                      <label className="text-sm">Toggle switch</label>
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
