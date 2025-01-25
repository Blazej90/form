"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Field } from "@/types/types";

import { ScrollArea } from "@/components/ui/scroll-area";

interface LeftPanelProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  fields: Field[];
  setFields: Dispatch<SetStateAction<Field[]>>;
  activeCard: string | null;
  setActiveCard: Dispatch<SetStateAction<string | null>>;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  title,
  setTitle,
  fields,
  setFields,
  activeCard,
  setActiveCard,
}) => {
  const [cards, setCards] = useState<string[]>([]);

  useEffect(() => {
    if (cards.length === 0) {
      addCard();
    }
  }, []);

  const addCard = () => {
    const newCardId = Date.now().toString();
    setCards((prevCards) => [...prevCards, newCardId]);
    setActiveCard(newCardId);
    setFields((prevFields) => [
      ...prevFields,
      {
        id: newCardId,
        type: "text",
        label: "",
        placeholder: "",
        required: false,
      },
    ]);
  };

  const removeCard = (cardId: string) => {
    setCards((prevCards) => prevCards.filter((id) => id !== cardId));
    setFields((prevFields) =>
      prevFields.filter((field) => field.id !== cardId)
    );
    if (activeCard === cardId) setActiveCard(null);
  };

  const updateField = (cardId: string, updatedField: Field) => {
    setFields((prevFields) =>
      prevFields.map((field) => (field.id === cardId ? updatedField : field))
    );
  };

  return (
    <div className="w-1/2 p-6 border-r border-gray-300 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Tytuł formularza</h1>
        <ModeToggle />
      </div>
      <Input
        placeholder="Wprowdź nazwę formularza"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4"
      />

      <Button onClick={addCard} className="mb-6 w-full">
        Nowa karta
      </Button>

      <ScrollArea className="max-h-[80vh] overflow-y-auto">
        {cards.map((cardId) => {
          const field =
            fields.find((field) => field.id === cardId) || ({} as Field);

          return (
            <Card key={cardId} className="mb-6">
              <CardHeader>
                <CardTitle>Karta ustawień pola</CardTitle>
                <CardDescription>Konfiguracja pola formularza</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-medium">
                    Typ pola
                  </label>
                  <Select
                    value={field.type}
                    onValueChange={(value) =>
                      updateField(cardId, { ...field, type: value })
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
                    value={field.label}
                    onChange={(e) =>
                      updateField(cardId, { ...field, label: e.target.value })
                    }
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
                      updateField(cardId, {
                        ...field,
                        placeholder: e.target.value,
                      })
                    }
                    placeholder="Nazwa dla Placeholder"
                    className="w-full"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <Switch
                    checked={field.required}
                    onCheckedChange={(checked) =>
                      updateField(cardId, { ...field, required: checked })
                    }
                  />
                  <label className="ml-2 text-sm font-medium">Wymagane</label>
                </div>
                <Button
                  onClick={() => removeCard(cardId)}
                  variant="destructive"
                  className="w-full"
                >
                  Usuń pole
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </ScrollArea>
    </div>
  );
};
