import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { cn } from "@/lib/cn";
import type { DataTableProps } from "@/models/dataTable.model";

export default function DataTable<T extends { id: string | number }>({
  title,
  description,
  columns,
  rows,
  emptyMessage = "No records available.",
  footer,
}: DataTableProps<T>) {
  return (
    <Card className="overflow-hidden p-0 shadow-none">
      <CardHeader className="mb-0 px-6 pb-4 pt-6">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-0 px-4 pb-4 pt-0">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left">
            <thead className="bg-zinc-50/80">
              <tr className="border-y border-zinc-200/80">
                {columns.map((column) => (
                  <th
                    key={column.header}
                    className={cn(
                      "px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500",
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
                      "bg-white transition-colors hover:bg-zinc-50/60",
                      rowIndex !== rows.length - 1
                        ? "border-b border-zinc-200"
                        : undefined
                    )}
                  >
                    {columns.map((column) => (
                      <td
                        key={`${row.id}-${column.header}`}
                        className={cn(
                          "px-6 py-4 text-left text-sm text-zinc-700",
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

        {footer ? (
          <div className="border-t border-zinc-200/80 px-4 py-3">{footer}</div>
        ) : null}
      </CardContent>
    </Card>
  );
}
