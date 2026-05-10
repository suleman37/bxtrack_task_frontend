"use client";

import { NotebookPen } from "lucide-react";
import type { NoteActionProps } from "@/models/noteActionProps.model";

export default function NoteAction({
  ariaLabel,
  disabled = false,
  onClick,
}: NoteActionProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-amber-600 transition-colors hover:bg-amber-50 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-amber-600"
    >
      <NotebookPen className="h-4 w-4" />
    </button>
  );
}
