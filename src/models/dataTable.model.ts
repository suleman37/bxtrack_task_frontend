import type { ReactNode } from "react";

export type DataTableColumn<T> = {
  header: string;
  className?: string;
  render: (row: T, rowIndex: number) => ReactNode;
};

export type DataTableProps<T extends { id: string | number }> = {
  title: string;
  description: string;
  columns: DataTableColumn<T>[];
  rows: T[];
  emptyMessage?: string;
  footer?: ReactNode;
};
