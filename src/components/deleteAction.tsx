"use client";

import { Trash2 } from "lucide-react";

type DeleteActionProps = {
  ariaLabel: string;
  onClick: () => void | Promise<void>;
  disabled?: boolean;
};

export default function DeleteAction({
  ariaLabel,
  onClick,
  disabled = false,
}: DeleteActionProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
