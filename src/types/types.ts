export type FieldType =
  | "text"
  | "textarea"
  | "select"
  | "checkbox-group"
  | "switch";

export interface FieldOption {
  id: string;
  value: string;
}

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  placeholder: string;
  required: boolean;
  options?: FieldOption[];
  selectedValues?: string[];
}
