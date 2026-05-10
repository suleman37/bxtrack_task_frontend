export type CustomerTableActionsProps = {
  customerId: number;
  customerName: string;
  customerStatus?: string;
};

export type CustomerNotesResponse =
  | { notes?: string; data?: unknown }
  | { notes?: unknown; items?: unknown; rows?: unknown; results?: unknown }
  | { notes?: string }[]
  | string[]
  | unknown;
