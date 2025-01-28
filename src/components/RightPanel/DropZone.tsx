"use client";

import React from "react";
import { DropZone as DropPrimitiveZone, Label } from "react-aria-components";
import { tv } from "tailwind-variants";

const dropZoneStyles = tv({
  base: "group flex max-h-[200px] max-w-xl flex-col items-center justify-center gap-2 rounded-md border border-dashed p-6 text-sm",
  variants: {
    isDropTarget: {
      true: "border-primary border-solid bg-primary/10 ring-4 ring-primary/20",
    },
  },
});

export const DropZone: React.FC = () => {
  return (
    <DropPrimitiveZone
      onDrop={(event) => {
        const dragEvent = event as unknown as React.DragEvent;
        const files = Array.from(dragEvent.dataTransfer.files);
        console.log("Files dropped:", files);
      }}
      className={dropZoneStyles()}
    >
      <Label>Drop your files here</Label>
      <p className="text-muted-foreground text-sm">Or click to select files</p>
    </DropPrimitiveZone>
  );
};
