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
import { Field } from "@/types/types";

interface FieldCardProps {
  field: Field;
  onUpdateField: (updatedField: Field) => void;
  onRemoveField: () => void;
}

export const FieldCard: React.FC<FieldCardProps> = ({
  field,
  onUpdateField,
  onRemoveField,
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Karta ustawień pola</CardTitle>
        <CardDescription>Konfiguracja pola formularza</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Typ pola</label>
          <Select
            value={field.type}
            onValueChange={(value) => onUpdateField({ ...field, type: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Wybierz typ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Tekst</SelectItem>
              <SelectItem value="textarea">Pole tekstowe</SelectItem>
              <SelectItem value="select">Lista rozwijana</SelectItem>
              <SelectItem value="checkbox">Pole wyboru</SelectItem>
              <SelectItem value="switch">Przełącznik</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            Etykieta pola
          </label>
          <Input
            value={field.label}
            onChange={(e) => onUpdateField({ ...field, label: e.target.value })}
            placeholder="Wprowadź nazwę pola"
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            Tekst zastępczy
          </label>
          <Input
            value={field.placeholder}
            onChange={(e) =>
              onUpdateField({ ...field, placeholder: e.target.value })
            }
            placeholder="Nazwa dla Placeholder"
            className="w-full"
          />
        </div>
        <div className="flex items-center mb-4">
          <Switch
            checked={field.required}
            onCheckedChange={(checked) =>
              onUpdateField({ ...field, required: checked })
            }
          />
          <label className="ml-2 text-sm font-medium">Wymagane</label>
        </div>
        <Button
          onClick={onRemoveField}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-md transition-colors"
        >
          Usuń pole
        </Button>
      </CardContent>
    </Card>
  );
};
