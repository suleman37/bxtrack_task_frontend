"use client";

import { RotateCcw } from "lucide-react";

type RestoreActionProps = {
  ariaLabel: string;
  onClick: () => void | Promise<void>;
  disabled?: boolean;
};

export default function RestoreAction({
  ariaLabel,
  onClick,
  disabled = false,
}: RestoreActionProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-emerald-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <RotateCcw className="h-4 w-4" />
    </button>
  );
}
