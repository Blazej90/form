import { Field } from "@/types/types";

export type FormData = { [key: string]: string | boolean | string[] };

export type ValidationErrorKey = "required" | "requiredSwitch";

export function validateFields(
  fields: Field[],
  formData: FormData
): Record<string, ValidationErrorKey> {
  const errors: Record<string, ValidationErrorKey> = {};

  for (const field of fields) {
    if (!field.required) continue;

    const value = formData[field.id];

    switch (field.type) {
      case "text":
      case "textarea":
      case "select":
        if (typeof value !== "string" || value.trim() === "") {
          errors[field.id] = "required";
        }
        break;
      case "checkbox-group":
        if (!Array.isArray(value) || value.length === 0) {
          errors[field.id] = "required";
        }
        break;
      case "switch":
        if (value !== true) {
          errors[field.id] = "requiredSwitch";
        }
        break;
    }
  }

  return errors;
}
