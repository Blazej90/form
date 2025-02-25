import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Field } from "@/types/types";

interface SubmitButtonProps {
  formData: { [key: string]: string | string[] | boolean };
  fields: Field[];
  onModalClose: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  formData,
  fields,
  onModalClose,
}) => {
  return (
    <div className="flex justify-center mt-6">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            className="px-4 py-2 bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-800 text-white text-sm font-semibold rounded-md transition-colors"
          >
            Submit
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dziękujemy!</AlertDialogTitle>
            <AlertDialogDescription>
              Twoje dane zostały przesłane pomyślnie.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mt-2">
            <p className="font-semibold">Dane z formularza:</p>
            <ul className="mt-2 space-y-1 text-sm">
              {Object.entries(formData).map(([key, value], index) => {
                if (key === "droppedImage" && typeof value === "string") {
                  return (
                    <li key={index}>
                      <strong>Plik:</strong>
                      <div className="flex items-center space-x-2 mt-1">
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
                const field = fields.find((f: Field) => f.id === key);
                return (
                  <li key={index}>
                    <strong>{field?.label || key}:</strong>{" "}
                    {Array.isArray(value) ? value.join(", ") : value.toString()}
                  </li>
                );
              })}
            </ul>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={onModalClose}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
