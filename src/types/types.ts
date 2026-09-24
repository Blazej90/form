export type FieldType =
  | "text"
  | "textarea"
  | "select"
  | "checkbox-group"
  | "switch";

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  placeholder: string;
  required: boolean;
  options?: string[];
  selectedValues?: string[];
}
