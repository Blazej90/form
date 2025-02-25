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
          placeholder={field.placeholder as string}
          className="w-full"
          value={(value as string) || ""}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )}

      {field.type === "textarea" && (
        <Textarea
          placeholder={field.placeholder as string}
          className="w-full"
          value={(value as string) || ""}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )}

      {field.type === "select" && (
        <Select
          value={(value as string) || ""}
          onValueChange={(val) => onChange(field.id, val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wybierz opcję" />
          </SelectTrigger>
          <SelectContent>
            {(field.options ?? []).map((option, index) => (
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
              const isChecked =
                Array.isArray(value) && (value as string[]).includes(label);
              return (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.id}-${index}`}
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      let updatedValues: string[] = [];
                      if (Array.isArray(value)) {
                        updatedValues = [...(value as string[])];
                      }
                      if (checked) {
                        if (!updatedValues.includes(label)) {
                          updatedValues.push(label);
                        }
                      } else {
                        updatedValues = updatedValues.filter(
                          (v) => v !== label
                        );
                      }
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
            checked={value as boolean}
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
