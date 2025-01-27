import React from "react";
import { Button } from "@/components/ui/button";

export const SubmitButton: React.FC = () => {
  return (
    <Button
      type="submit"
      className="mb-6 px-4 py-2 bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-800 text-white text-sm font-semibold rounded-md transition-colors"
    >
      Submit
    </Button>
  );
};
