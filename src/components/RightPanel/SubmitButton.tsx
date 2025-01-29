import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Modal from "react-modal";

interface SubmitButtonProps {
  resetForm: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ resetForm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement("#__next");
    }
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = () => {
    resetForm();

    openModal();
  };

  return (
    <div>
      <Button
        type="button"
        onClick={handleSubmit}
        className="mb-6 px-4 py-2 bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-800 text-white text-sm font-semibold rounded-md transition-colors"
      >
        Submit
      </Button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Form Submission"
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold text-center text-black dark:text-white">
          Dziękujemy! Twój formularz został wysłany
        </h2>
        <button
          onClick={closeModal}
          className="mt-4 bg-purple-600 dark:bg-purple-700 text-white p-2 rounded hover:bg-purple-700 dark:hover:bg-purple-800"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};
