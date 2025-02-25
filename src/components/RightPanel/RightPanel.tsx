"use client";

import React, { useState } from "react";
import { Field } from "@/types/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { FormTitle } from "./FormTitle";
import { FieldList } from "./RightFieldList";
import { SubmitButton } from "./SubmitButton";
import { DropZoneComponent } from "./DropZone";

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
    [key: string]: string | string[] | boolean;
  }>({});
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleChange = (id: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleModalClose = () => {
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
            <FieldList fields={fields} onChange={handleChange} />
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
              onModalClose={handleModalClose}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
