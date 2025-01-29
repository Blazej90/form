"use client";

import React from "react";
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
  return (
    <div className="w-1/2 p-6 overflow-y-auto">
      <Card className="shadow-md border border-gray-300 dark:border-gray-700">
        <CardHeader>
          <FormTitle title={title} />
        </CardHeader>
        <CardContent>
          <form>
            <FieldList fields={fields} />
            <DropZoneComponent />
            <SubmitButton resetForm={resetForm} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
