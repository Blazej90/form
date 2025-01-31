import React, { useState } from "react";
import { Field } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

interface FieldRendererProps {
  field: Field;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({ field }) => {
  const [checkboxLabels, setCheckboxLabels] = useState<string[]>([
    "",
    "",
    "",
    "",
  ]);

  const handleCheckboxLabelChange = (index: number, value: string) => {
    const updatedLabels = [...checkboxLabels];
    updatedLabels[index] = value;
    setCheckboxLabels(updatedLabels);
  };

  if (!field.id) {
    console.error("Rendering field with ID: undefined");
    return null;
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">
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
        <Textarea placeholder={field.placeholder || ""} className="w-full" />
      )}

      {field.type === "select" && (
        <Select onValueChange={(value) => console.log(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      )}

      {field.type === "checkbox" && (
        <div className="flex items-center space-x-2">
          <Checkbox id={field.id} />
          <label htmlFor={field.id} className="text-sm">
            {field.placeholder || field.label}
          </label>
        </div>
      )}

      {field.type === "checkbox-group" && (
        <div className="flex justify-between w-full space-x-4 mt-2">
          {checkboxLabels.map((label, index) => (
            <div key={index} className="flex items-center space-x-2 w-1/4">
              <Checkbox id={`${field.id}-${index}`} />
              <Input
                type="text"
                value={label}
                onChange={(e) =>
                  handleCheckboxLabelChange(index, e.target.value)
                }
                placeholder={`Nazwa ${index + 1}`}
                className="w-full text-sm"
              />
            </div>
          ))}
        </div>
      )}

      {field.type === "switch" && (
        <div className="flex items-center space-x-2">
          <Switch id={field.id} />
          <label htmlFor={field.id} className="text-sm">
            {field.placeholder || field.label}
          </label>
        </div>
      )}
    </div>
  );
};
