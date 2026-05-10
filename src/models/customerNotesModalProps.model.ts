import type { PaginationModel } from "@/models/pagination.model";

export type CustomerNotesModalProps = {
  isOpen: boolean;
  customerName: string;
  isLoading?: boolean;
  isSaving?: boolean;
  draftNotes: string[];
  savedNotes: string[];
  pagination: PaginationModel;
  onAddNote: () => void;
  onChangeNote: (index: number, value: string) => void;
  onClose: () => void;
  onPageChange: (page: number) => void;
  onRemoveNote: (index: number) => void;
  onSave: () => void | Promise<void>;
};
