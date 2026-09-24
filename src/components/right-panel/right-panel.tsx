"use client";

import React, { useState } from "react";
import { Field } from "@/types/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { FormTitle } from "./form-title";
import { RightFieldList } from "./right-field-list";
import { SubmitButton } from "./submit-button";
import { DropZoneComponent } from "./drop-zone";
import { validateFields, ValidationErrorKey } from "@/lib/validation";

interface RightPanelProps {
  title: string;
  fields: Field[];
  resetForm: () => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  title,
  fields,
  resetForm,
}) => {
  const [formData, setFormData] = useState<{
    [key: string]: string | boolean | string[];
  }>({});
  const [errors, setErrors] = useState<Record<string, ValidationErrorKey>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleChange = (id: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      if (!(id in prev)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleSubmit = () => {
    const validationErrors = validateFields(fields, formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setDialogOpen(true);
    }
  };

  const handleReset = () => {
    resetForm();
    setFormData({});
    setErrors({});
    setDialogOpen(false);
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <div className="w-1/2 p-6 overflow-y-auto">
      <Card className="shadow-md border border-gray-300 dark:border-gray-700">
        <CardHeader>
          <FormTitle title={title} />
        </CardHeader>
        <CardContent>
          <form>
            <RightFieldList
              fields={fields}
              formData={formData}
              errors={errors}
              onChange={handleChange}
            />
            <DropZoneComponent
              resetTrigger={resetTrigger}
              onFileDrop={(fileUrl, fileName) =>
                setFormData((prev) => ({
                  ...prev,
                  droppedImage: fileUrl,
                  droppedFileName: fileName,
                }))
              }
            />
            <SubmitButton
              formData={formData}
              fields={fields}
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              onSubmit={handleSubmit}
              onConfirm={handleReset}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
