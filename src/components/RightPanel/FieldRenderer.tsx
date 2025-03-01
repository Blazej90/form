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
  onChange: (id: string, value: string | boolean | string[]) => void;
  value: string | boolean | string[];
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  onChange,
  value,
}) => {
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
          value={typeof value === "string" ? value : ""}
          placeholder={
            Array.isArray(field.placeholder)
              ? field.placeholder[0]
              : field.placeholder
          }
          className="w-full"
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )}

      {field.type === "textarea" && (
        <Textarea
          value={typeof value === "string" ? value : ""}
          placeholder={
            Array.isArray(field.placeholder)
              ? field.placeholder[0]
              : field.placeholder
          }
          className="w-full"
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )}

      {field.type === "select" && (
        <Select
          value={typeof value === "string" ? value : ""}
          onValueChange={(val) => onChange(field.id, val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wybierz opcję" />
          </SelectTrigger>
          <SelectContent>
            {(field.options ?? [])
              .filter((option) => option.trim() !== "")
              .map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}

      {field.type === "checkbox-group" && (
        <div className="flex flex-wrap gap-2 mt-2">
          {Array.isArray(field.placeholder) &&
            field.placeholder.map((label, index) => {
              const isChecked = Array.isArray(value) && value.includes(label);
              return (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.id}-${index}`}
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      const updatedValues = Array.isArray(value)
                        ? checked
                          ? [...value, label]
                          : value.filter((val: string) => val !== label)
                        : checked
                          ? [label]
                          : [];

                      onChange(field.id, updatedValues);
                    }}
                  />
                  <label htmlFor={`${field.id}-${index}`} className="text-sm">
                    {label}
                  </label>
                </div>
              );
            })}
        </div>
      )}

      {field.type === "switch" && (
        <div className="flex items-center space-x-2">
          <Switch
            id={field.id}
            checked={typeof value === "boolean" ? value : false}
            onCheckedChange={(checked) => onChange(field.id, checked)}
          />
          <label htmlFor={field.id} className="text-sm">
            {field.placeholder || field.label}
          </label>
        </div>
      )}
    </div>
  );
};
