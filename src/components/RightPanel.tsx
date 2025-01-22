"use client";

interface RightPanelProps {
  title: string;
  fields: any[];
}

export const RightPanel: React.FC<RightPanelProps> = ({ title, fields }) => {
  return (
    <div className="w-1/2 p-6">
      <h2 className="text-xl font-bold">
        {title || "Wprowadź nazwę formularza..."}
      </h2>

      <div className="mt-4">
        {fields.map((field, index) => (
          <div key={index} className="mb-4">
            {field.type === "text" && (
              <input type="text" placeholder={field.placeholder} />
            )}
            {field.type === "textarea" && (
              <textarea placeholder={field.placeholder} />
            )}
            {field.type === "select" && (
              <select>
                {field.options.map((option: string, i: number) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {field.type === "checkbox" && <input type="checkbox" />}
            {field.type === "switch" && <input type="checkbox" />}
          </div>
        ))}
      </div>
    </div>
  );
};
