"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useTranslation } from "@/i18n/language-provider";

interface LeftPanelHeaderProps {
  title: string;
  setTitle: (value: string) => void;
  onAddCard: () => void;
}

export const LeftPanelHeader: React.FC<LeftPanelHeaderProps> = ({
  title,
  setTitle,
  onAddCard,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">{t("header.appTitle")}</h1>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ModeToggle />
        </div>
      </div>
      <Input
        placeholder={t("header.formNamePlaceholder")}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4"
      />
      <Button onClick={onAddCard} className="mb-6">
        {t("header.addField")}
      </Button>
    </div>
  );
};
