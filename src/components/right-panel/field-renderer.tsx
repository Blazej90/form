"use client";

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
import { useTranslation } from "@/i18n/language-provider";
import { ValidationErrorKey } from "@/lib/validation";

interface FieldRendererProps {
  field: Field;
  onChange: (id: string, value: string | boolean | string[]) => void;
  value: string | boolean | string[];
  error?: ValidationErrorKey;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  onChange,
  value,
  error,
}) => {
  const { t } = useTranslation();

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
          placeholder={field.placeholder}
          className="w-full"
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )}

      {field.type === "textarea" && (
        <Textarea
          value={typeof value === "string" ? value : ""}
          placeholder={field.placeholder}
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
            <SelectValue placeholder={t("preview.selectPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            {(field.options ?? [])
              .filter((option) => option.value.trim() !== "")
              .map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.value}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      )}

      {field.type === "checkbox-group" && (
        <div className="flex flex-wrap gap-2 mt-2">
          {(field.options ?? []).map((option) => {
            const isChecked =
              Array.isArray(value) && value.includes(option.value);
            const checkboxId = `${field.id}-${option.id}`;
            return (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={checkboxId}
                  checked={isChecked}
                  onCheckedChange={(checked) => {
                    const updatedValues = Array.isArray(value)
                      ? checked
                        ? [...value, option.value]
                        : value.filter((val: string) => val !== option.value)
                      : checked
                        ? [option.value]
                        : [];

                    onChange(field.id, updatedValues);
                  }}
                />
                <label htmlFor={checkboxId} className="text-sm">
                  {option.value}
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

      {error && (
        <p className="mt-1 text-sm text-red-500">{t(`validation.${error}`)}</p>
      )}
    </div>
  );
};
