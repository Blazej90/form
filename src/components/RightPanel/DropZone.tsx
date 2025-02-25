import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { IconGallery } from "justd-icons";

interface DropZoneProps {
  resetTrigger: number;
  onFileDrop?: (fileUrl: string, fileName: string) => void;
}

export function DropZoneComponent({ resetTrigger, onFileDrop }: DropZoneProps) {
  const [droppedImage, setDroppedImage] = useState<string | undefined>(
    undefined
  );

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setDroppedImage(url);
      if (onFileDrop) {
        onFileDrop(url, file.name);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    onDrop,
  });

  useEffect(() => {
    setDroppedImage(undefined);
  }, [resetTrigger]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        {...getRootProps()}
        className="dropzone border-dashed border-2 p-4 rounded-lg flex flex-col items-center justify-center space-y-4"
      >
        {droppedImage ? (
          <img
            alt="Dropped file"
            src={droppedImage}
            className="aspect-square h-64 w-64 object-contain rounded-md"
          />
        ) : (
          <div className="grid space-y-3 text-center">
            <div className="mx-auto grid h-12 w-12 place-content-center rounded-full border bg-secondary/70">
              <IconGallery className="h-5 w-5" />
            </div>
            <div className="flex justify-center">
              <input {...getInputProps()} />
              <p>Upload a file</p>
            </div>
            <p className="text-sm text-gray-500">
              Or drag and drop PNG, JPG files up to 10MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
