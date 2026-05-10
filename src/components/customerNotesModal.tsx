"use client";

import { useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import Button from "@/components/button";
import Card, {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import type { CustomerNotesModalProps } from "@/models/customerNotesModalProps.model";

export default function CustomerNotesModal({
  isOpen,
  customerName,
  isLoading = false,
  isSaving = false,
  draftNotes,
  savedNotes,
  pagination,
  onAddNote,
  onChangeNote,
  onClose,
  onPageChange,
  onRemoveNote,
  onSave,
}: CustomerNotesModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-[70px]"
      onClick={onClose}
      role="presentation"
    >
      <Card
        className="flex max-h-[calc(100vh-140px)] w-full max-w-2xl flex-col p-0"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="customer-notes-title"
      >
        <CardHeader className="mb-0 flex-row items-start justify-between px-3 py-3">
          <div className="space-y-1">
            <CardTitle id="customer-notes-title">Customer Notes</CardTitle>
            <p className="text-sm text-zinc-500">{customerName}</p>
          </div>

          <button
            type="button"
            aria-label="Close customer notes"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </CardHeader>

        <CardContent className="overflow-y-auto px-3 py-3">
          <div className="space-y-3">
            {savedNotes.map((note, index) => (
              <textarea
                key={`saved-${index}`}
                className="min-h-11 w-full resize-none rounded-[8px] border-transparent bg-zinc-100 px-3 py-3 text-sm text-zinc-700 outline-none"
                value={note}
                readOnly
                placeholder={`Saved note ${index + 1}`}
                rows={1}
              />
            ))}

            {draftNotes.map((note, index) => (
              <div key={`draft-${index}`} className="flex items-center gap-3">
                <textarea
                  className="min-h-11 w-full resize-none rounded-[8px] border-transparent bg-zinc-50 px-3 py-3 text-sm text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-transparent"
                  value={note}
                  onChange={(event) => onChangeNote(index, event.target.value)}
                  placeholder={`New note ${index + 1}`}
                  rows={1}
                />

                <button
                  type="button"
                  aria-label="Add note"
                  disabled={isSaving}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-zinc-200 text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-700"
                  onClick={onAddNote}
                >
                  <Plus className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  aria-label={`Delete note ${index + 1}`}
                  disabled={isSaving}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-zinc-200 text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-700"
                  onClick={() => onRemoveNote(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            {isLoading && savedNotes.length === 0 ? (
              <p className="text-sm text-zinc-500">Loading notes...</p>
            ) : null}
          </div>
        </CardContent>

        <CardFooter className="mt-0 flex-col items-stretch gap-3 px-3 py-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600">
              Page {pagination.page} of {pagination.totalPages} - {pagination.total}{" "}
              note{pagination.total === 1 ? "" : "s"}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:pointer-events-none disabled:opacity-50"
                disabled={!pagination.hasPreviousPage}
                onClick={() => onPageChange(pagination.page - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:pointer-events-none disabled:opacity-50"
                disabled={!pagination.hasNextPage}
                onClick={() => onPageChange(pagination.page + 1)}
              >
                Next
              </button>
            </div>
          </div>

          <Button className="text-white" disabled={isSaving} onClick={onSave}>
            Save Notes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
