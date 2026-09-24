"use client";

import React, { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LeftPanelHeader } from "./left-panel-header";
import { LeftFieldList } from "./left-field-list";
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
  const didInit = useRef(false);

  const addCard = () => {
    const newFieldId = crypto.randomUUID();
    setActiveCard(newFieldId);
    setFields((prevFields) => [
      ...prevFields,
      {
        id: newFieldId,
        type: "text",
        label: "",
        placeholder: "",
        required: false,
      },
    ]);
  };

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    if (fields.length === 0) addCard();
  }, []);

  const removeCard = (cardId: string) => {
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
    <div className="w-1/2 p-6 border-r border-border bg-card/40 backdrop-blur-sm">
      <LeftPanelHeader title={title} setTitle={setTitle} onAddCard={addCard} />
      <ScrollArea className="max-h-[80vh] overflow-y-auto">
        <LeftFieldList
          fields={fields}
          onUpdateField={updateField}
          onRemoveField={removeCard}
        />
      </ScrollArea>
    </div>
  );
};
