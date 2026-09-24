"use client";

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ImageUp } from "lucide-react";
import { useTranslation } from "@/i18n/language-provider";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface DropZoneProps {
  resetTrigger: number;
  onFileDrop?: (fileUrl: string, fileName: string) => void;
}

export function DropZoneComponent({ resetTrigger, onFileDrop }: DropZoneProps) {
  const { t } = useTranslation();
  const [droppedImage, setDroppedImage] = useState<string | undefined>(
    undefined
  );

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setDroppedImage((previousUrl) => {
      if (previousUrl) URL.revokeObjectURL(previousUrl);
      return url;
    });
    onFileDrop?.(url, file.name);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxSize: MAX_FILE_SIZE,
    onDrop,
  });

  useEffect(() => {
    setDroppedImage((previousUrl) => {
      if (previousUrl) URL.revokeObjectURL(previousUrl);
      return undefined;
    });
  }, [resetTrigger]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        {...getRootProps()}
        className="dropzone border-dashed border-2 p-4 rounded-lg flex flex-col items-center justify-center space-y-4"
      >
        <input {...getInputProps()} />
        {droppedImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="Dropped file"
            src={droppedImage}
            className="aspect-square h-64 w-64 object-contain rounded-md"
          />
        ) : (
          <div className="grid space-y-3 text-center">
            <div className="mx-auto grid h-12 w-12 place-content-center rounded-full border bg-secondary/70">
              <ImageUp className="h-5 w-5" />
            </div>
            <p>{t("dropZone.upload")}</p>
            <p className="text-sm text-gray-500">{t("dropZone.hint")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
