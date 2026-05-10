"use client";

import { NotebookPen } from "lucide-react";
import type { NoteActionProps } from "@/models/noteActionProps.model";

export default function NoteAction({
  ariaLabel,
  onClick,
}: NoteActionProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-amber-600 transition-colors hover:bg-amber-50 hover:text-amber-700"
    >
      <NotebookPen className="h-4 w-4" />
    </button>
  );
}
