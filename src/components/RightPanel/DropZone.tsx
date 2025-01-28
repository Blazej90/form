import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IconGallery } from "justd-icons";

export function DropZoneComponent() {
  const [droppedImage, setDroppedImage] = useState<string | undefined>(
    undefined
  );

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setDroppedImage(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="dropzone border-dashed border-2 p-4 rounded-lg flex flex-col items-center justify-center space-y-4"
    >
      {droppedImage ? (
        <img
          alt="Dropped file"
          src={droppedImage}
          className="aspect-square size-full object-contain rounded-md"
        />
      ) : (
        <div className="grid space-y-3 text-center">
          <div className="mx-auto grid size-12 place-content-center rounded-full border bg-secondary/70">
            <IconGallery className="size-5" />
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
  );
}
