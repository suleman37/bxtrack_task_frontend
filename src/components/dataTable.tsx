import type { ReactNode } from "react";
import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { cn } from "@/lib/cn";

type DataTableColumn<T> = {
  header: string;
  className?: string;
  render: (row: T, rowIndex: number) => ReactNode;
};

type DataTableProps<T extends { id: string | number }> = {
  title: string;
  description: string;
  columns: DataTableColumn<T>[];
  rows: T[];
  emptyMessage?: string;
  footer?: ReactNode;
};

export default function DataTable<T extends { id: string | number }>({
  title,
  description,
  columns,
  rows,
  emptyMessage = "No records available.",
  footer,
}: DataTableProps<T>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto" >
          <table className="min-w-full border-collapse text-left">
            <thead className="bg-zinc-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.header}
                    className={cn(
                      "px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500",
                      column.className
                    )}
                    scope="col"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.length > 0 ? (
                rows.map((row, rowIndex) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "bg-white",
                      rowIndex !== rows.length - 1
                        ? "border-b border-zinc-200"
                        : undefined
                    )}
                  >
                    {columns.map((column) => (
                      <td
                        key={`${row.id}-${column.header}`}
                    className={cn(
                          "px-6 py-4 text-sm text-zinc-700",
                          column.className
                        )}
                      >
                        {column.render(row, rowIndex)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-6 py-8 text-center text-sm text-zinc-500"
                    colSpan={columns.length}
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {footer ? <div className="mt-4">{footer}</div> : null}
      </CardContent>
    </Card>
  );
}
