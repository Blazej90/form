"use client";

import React, { useState } from "react";
import { Field } from "@/types/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { FormTitle } from "./form-title";
import { FieldList } from "./right-field-list";
import { SubmitButton } from "./submit-button";
import { DropZoneComponent } from "./drop-zone";

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
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleChange = (id: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    resetForm();
    setFormData({});
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
            <FieldList
              fields={fields}
              formData={formData}
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
              onModalClose={handleReset}
              onResetForm={handleReset}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
