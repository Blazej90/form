"use client";

import React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Field } from "@/types/types";
import { useTranslation } from "@/i18n/language-provider";

interface SubmitButtonProps {
  formData: { [key: string]: string | string[] | boolean };
  fields: Field[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  onConfirm: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  formData,
  fields,
  open,
  onOpenChange,
  onSubmit,
  onConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center mt-6">
      <Button
        type="button"
        onClick={onSubmit}
        className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md transition-all hover:from-violet-700 hover:to-indigo-700 hover:shadow-lg"
      >
        <Send className="mr-2 h-4 w-4" />
        {t("preview.submit")}
      </Button>
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("submitDialog.title")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("submitDialog.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mt-2">
            <p className="font-semibold">{t("submitDialog.formData")}</p>
            <ul className="mt-2 space-y-1 text-sm">
              {Object.entries(formData).map(([key, value]) => {
                if (key === "droppedFileName") return null;

                const field = fields.find((f: Field) => f.id === key);

                if (key === "droppedImage" && typeof value === "string") {
                  return (
                    <li key={key}>
                      <strong>{t("submitDialog.file")}</strong>
                      <div className="flex items-center space-x-2 mt-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={value}
                          alt="Dropped file"
                          className="h-16 w-16 object-contain rounded-md"
                        />
                        {formData["droppedFileName"] && (
                          <span>{formData["droppedFileName"] as string}</span>
                        )}
                      </div>
                    </li>
                  );
                }

                if (field?.type === "checkbox-group") {
                  const selectedValues =
                    Array.isArray(value) && field.options
                      ? value
                          .filter((selectedValue) =>
                            field.options!.some(
                              (option) => option.value === selectedValue
                            )
                          )
                          .join(", ")
                      : "";

                  return (
                    <li key={key}>
                      <strong>{field.label}:</strong>{" "}
                      {selectedValues || t("submitDialog.noSelection")}
                    </li>
                  );
                }

                return (
                  <li key={key}>
                    <strong>{field?.label || key}:</strong>{" "}
                    {typeof value === "boolean"
                      ? value
                        ? t("submitDialog.yes")
                        : t("submitDialog.no")
                      : Array.isArray(value)
                        ? value.join(", ")
                        : value}
                  </li>
                );
              })}
            </ul>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("submitDialog.cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>
              {t("submitDialog.ok")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
