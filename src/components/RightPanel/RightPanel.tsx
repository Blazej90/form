// "use client";

// import React, { useState } from "react";
// import { Field } from "@/types/types";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { FormTitle } from "./FormTitle";
// import { FieldList } from "./RightFieldList";
// import { SubmitButton } from "./SubmitButton";
// import { DropZoneComponent } from "./DropZone";

// interface RightPanelProps {
//   title: string;
//   fields: Field[];
//   resetForm: () => void;
// }

// export const RightPanel: React.FC<RightPanelProps> = ({
//   title,
//   fields,
//   resetForm,
// }) => {
//   const [resetTrigger, setResetTrigger] = useState(0);

//   const handleReset = () => {
//     resetForm();
//     setResetTrigger((prev) => prev + 1);
//   };

//   return (
//     <div className="w-1/2 p-6 overflow-y-auto">
//       <Card className="shadow-md border border-gray-300 dark:border-gray-700">
//         <CardHeader>
//           <FormTitle title={title} />
//         </CardHeader>
//         <CardContent>
//           <form>
//             <FieldList fields={fields} />
//             <DropZoneComponent resetTrigger={resetTrigger} />
//             <SubmitButton resetForm={handleReset} />
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

//2//
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
    [key: string]: string | string[];
  }>({});
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // ← Dodane

  console.log("🔵 RightPanel render - isModalOpen:", isModalOpen);

  const handleChange = (id: string, value: string | boolean) => {
    setFormData((prev) => {
      const newValue = typeof value === "boolean" ? String(value) : value;
      return { ...prev, [id]: newValue };
    });
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
            <FieldList fields={fields} onChange={handleChange} />
            <DropZoneComponent resetTrigger={resetTrigger} />
            <SubmitButton
              formData={formData}
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
