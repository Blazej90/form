import React from "react";
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
  if (!field.id) {
    console.error("Rendering field with ID: undefined");
    return null;
  }

  return (
    <div className="mb-4">
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
};
