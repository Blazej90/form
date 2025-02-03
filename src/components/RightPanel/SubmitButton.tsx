// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import Modal from "react-modal";

// interface SubmitButtonProps {
//   resetForm: () => void;
// }

// export const SubmitButton: React.FC<SubmitButtonProps> = ({ resetForm }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       Modal.setAppElement("#__next");
//     }
//   }, []);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSubmit = () => {
//     resetForm();

//     openModal();
//   };

//   return (
//     <div className="flex justify-center mt-6">
//       {" "}
//       <Button
//         type="button"
//         onClick={handleSubmit}
//         className="px-4 py-2 bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-800 text-white text-sm font-semibold rounded-md transition-colors"
//       >
//         Submit
//       </Button>
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         contentLabel="Form Submission"
//         className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
//       >
//         <h2 className="text-xl font-semibold text-center text-black dark:text-white">
//           Dziękujemy! Twój formularz został wysłany
//         </h2>
//         <button
//           onClick={closeModal}
//           className="mt-4 bg-purple-600 dark:bg-purple-700 text-white p-2 rounded hover:bg-purple-700 dark:hover:bg-purple-800"
//         >
//           Close
//         </button>
//       </Modal>
//     </div>
//   );
// };

//2//
import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface SubmitButtonProps {
  formData: { [key: string]: string | string[] };
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  formData,
  isOpen,
  setIsOpen,
}) => {
  console.log("🟢 SubmitButton render - isOpen:", isOpen);

  const openModal = () => {
    console.log("🔵 Otwarcie modala");
    setIsOpen(true);
  };

  const closeModal = () => {
    console.log("🔴 Zamknięcie modala");
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center mt-6">
      <Button
        onClick={openModal}
        className="px-4 py-2 bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-800 text-white text-sm font-semibold rounded-md transition-colors"
      >
        Submit
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Dziękujemy! Twój formularz został wysłany
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mt-2 font-semibold">Dane z formularza:</p>
              <ul className="mt-2 space-y-1 text-sm">
                {Object.entries(formData).map(([key, value], index) => (
                  <li key={index}>
                    <strong>{key}:</strong>{" "}
                    {Array.isArray(value) ? value.join(", ") : value}
                  </li>
                ))}
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeModal}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
