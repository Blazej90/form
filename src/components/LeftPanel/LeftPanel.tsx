"use client";

import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LeftPanelHeader } from "./LeftPanelHeader";
import { FieldList } from "./LeftFieldList";
import { Field } from "@/types/types";

interface LeftPanelProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  activeCard: string | null;
  setActiveCard: React.Dispatch<React.SetStateAction<string | null>>;
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

  const updateField = (id: string, updatedField: Field) => {
    setFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? updatedField : field))
    );
  };

  return (
    <div className="w-1/2 p-6 border-r border-gray-300 dark:border-gray-700">
      <LeftPanelHeader title={title} setTitle={setTitle} onAddCard={addCard} />
      <ScrollArea className="max-h-[80vh] overflow-y-auto">
        <FieldList
          fields={fields}
          onUpdateField={updateField}
          onRemoveField={removeCard}
        />
      </ScrollArea>
    </div>
  );
};
