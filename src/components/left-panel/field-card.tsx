"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Field, FieldOption, FieldType } from "@/types/types";
import { useTranslation } from "@/i18n/language-provider";

interface FieldCardProps {
  field: Field;
  onUpdateField: (updatedField: Field) => void;
  onRemoveField: () => void;
}

const FIELD_TYPES: FieldType[] = [
  "text",
  "textarea",
  "select",
  "checkbox-group",
  "switch",
];

const TYPE_LABEL_KEYS: Record<FieldType, string> = {
  text: "fieldCard.types.text",
  textarea: "fieldCard.types.textarea",
  select: "fieldCard.types.select",
  "checkbox-group": "fieldCard.types.checkboxGroup",
  switch: "fieldCard.types.switch",
};

export const FieldCard: React.FC<FieldCardProps> = ({
  field,
  onUpdateField,
  onRemoveField,
}) => {
  const { t } = useTranslation();
  const options = field.options ?? [];

  const setOptions = (updatedOptions: FieldOption[]) =>
    onUpdateField({ ...field, options: updatedOptions });

  const hasOptions = field.type === "select" || field.type === "checkbox-group";
  const optionPlaceholderKey =
    field.type === "select"
      ? "fieldCard.optionPlaceholder"
      : "fieldCard.checkboxOptionPlaceholder";

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t("fieldCard.title")}</CardTitle>
        <CardDescription>{t("fieldCard.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            {t("fieldCard.typeLabel")}
          </label>
          <Select
            value={field.type}
            onValueChange={(value) =>
              onUpdateField({ ...field, type: value as FieldType })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("fieldCard.typePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {FIELD_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {t(TYPE_LABEL_KEYS[type])}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            {t("fieldCard.labelLabel")}
          </label>
          <Input
            value={field.label}
            onChange={(e) => onUpdateField({ ...field, label: e.target.value })}
            placeholder={t("fieldCard.labelPlaceholder")}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            {t("fieldCard.placeholderLabel")}
          </label>
          <Input
            value={field.placeholder}
            onChange={(e) =>
              onUpdateField({ ...field, placeholder: e.target.value })
            }
            placeholder={t("fieldCard.placeholderPlaceholder")}
            className="w-full"
            disabled={hasOptions}
          />
        </div>

        {hasOptions && (
          <div className="mb-4">
            {field.type === "select" && (
              <label className="block mb-2 text-sm font-medium">
                {t("fieldCard.selectOptionsLabel")}
              </label>
            )}
            {field.type === "checkbox-group" && options.length === 0 && (
              <div className="mt-4">{t("fieldCard.addAnotherCheckbox")}</div>
            )}
            {options.map((option, index) => (
              <div key={option.id} className="flex mb-2 gap-2">
                <Input
                  value={option.value}
                  onChange={(e) =>
                    setOptions(
                      options.map((o) =>
                        o.id === option.id ? { ...o, value: e.target.value } : o
                      )
                    )
                  }
                  placeholder={`${t(optionPlaceholderKey)} ${index + 1}`}
                  className="w-full"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() =>
                    setOptions(options.filter((o) => o.id !== option.id))
                  }
                >
                  {t("fieldCard.remove")}
                </Button>
              </div>
            ))}
            <Button
              type="button"
              className="mt-4 mb-6"
              onClick={() =>
                setOptions([...options, { id: crypto.randomUUID(), value: "" }])
              }
            >
              {t("fieldCard.add")}
            </Button>
          </div>
        )}

        <div className="flex items-center mb-4">
          <Switch
            checked={field.required}
            onCheckedChange={(checked) =>
              onUpdateField({ ...field, required: checked })
            }
          />
          <label className="ml-2 text-sm font-medium">
            {t("fieldCard.required")}
          </label>
        </div>

        <Button variant="destructive" onClick={onRemoveField}>
          {t("fieldCard.removeField")}
        </Button>
      </CardContent>
    </Card>
  );
};
