"use client";

import { Pencil } from "lucide-react";

type EditActionProps = {
  ariaLabel: string;
  onClick: () => void;
};

export default function EditAction({
  ariaLabel,
  onClick,
}: EditActionProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-950"
    >
      <Pencil className="h-4 w-4" />
    </button>
  );
}
