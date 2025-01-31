export interface Field {
  id: string;
  type: string;
  label: string;
  placeholder: string | string[];
  required: boolean;
  options?: string[];
}
