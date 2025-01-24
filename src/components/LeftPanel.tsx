"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
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

interface LeftPanelProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  fields: Field[];
  setFields: Dispatch<SetStateAction<Field[]>>;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  title,
  setTitle,
  fields,
  setFields,
}) => {
  const [currentField, setCurrentField] = useState<Field>({
    id: Date.now().toString(),
    type: "text",
    label: "",
    placeholder: "",
    required: false,
  });

  const addField = () => {
    const newField = {
      ...currentField,
      ...(currentField.type === "select" && {
        options: ["Opcja 1", "Opcja 2", "Opcja 3"],
      }),
    };
    setFields([...fields, newField]);
    setCurrentField({
      id: Date.now().toString(),
      type: "text",
      label: "",
      placeholder: "",
      required: false,
    });
  };

  const removeField = () => {
    setFields(fields.filter((field) => field.id !== currentField.id));
  };

  return (
    <div className="w-1/2 p-6 border-r border-gray-300 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Tytuł formularza</h1>
        <ModeToggle />
      </div>
      <Input
        placeholder="My form"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-6"
      />
      <div>
        <div className="p-4 border border-gray-300 rounded-lg mb-6">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Typ pola</label>
            <Select
              value={currentField.type}
              onValueChange={(value) =>
                setCurrentField({ ...currentField, type: value })
              }
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
              value={currentField.label}
              onChange={(e) =>
                setCurrentField({ ...currentField, label: e.target.value })
              }
              placeholder="Nowe pole"
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              Tekst zastępczy
            </label>
            <Input
              value={currentField.placeholder}
              onChange={(e) =>
                setCurrentField({
                  ...currentField,
                  placeholder: e.target.value,
                })
              }
              placeholder="Placeholder"
              className="w-full"
            />
          </div>
          <div className="flex items-center mb-4">
            <Switch
              checked={currentField.required}
              onCheckedChange={(checked) =>
                setCurrentField({ ...currentField, required: checked })
              }
            />
            <label className="ml-2 text-sm font-medium">Wymagane</label>
          </div>
          <Button onClick={addField} className="mb-4 w-full">
            Dodaj pole
          </Button>
          <Button
            onClick={removeField}
            variant="destructive"
            className="w-full"
          >
            Usuń pole
          </Button>
        </div>
      </div>
    </div>
  );
};
