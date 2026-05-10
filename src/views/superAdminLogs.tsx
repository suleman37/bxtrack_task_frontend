"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchLogs,
  selectLogs,
  selectLogsPagination,
} from "@/app/slices/log.slice";
import type { AppDispatch } from "@/app/store";
import DataTable from "@/src/components/dataTable";
import { shouldSkipPageChange } from "@/utility/pagination";

export default function SuperAdminLogsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const logs = useSelector(selectLogs);
  const pagination = useSelector(selectLogsPagination);

  function handlePageChange(page: number) {
    if (shouldSkipPageChange(page, pagination)) {
      return;
    }

    dispatch(fetchLogs(true, page));
  }

  return (
    <section className="space-y-6">
      <DataTable
        columns={[
          {
            header: "Index",
            render: (_, rowIndex) =>
              (pagination.page - 1) * pagination.limit + rowIndex + 1,
          },
          {
            header: "Created By",
            render: (log) => log.createdByName,
          },
          {
            header: "Action",
            render: (log) => log.action,
          },
          {
            header: "Details",
            render: (log) => log.details,
          },
          {
            header: "Date",
            render: (log) => log.date,
          },
          {
            header: "Time",
            render: (log) => log.time,
          },
        ]}
        description="Review recent platform-level activity recorded for super admins."
        emptyMessage="No audit logs available yet."
        rows={logs}
        footer={
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600">
              Page {pagination.page} of {pagination.totalPages} - {pagination.total}{" "}
              log{pagination.total === 1 ? "" : "s"}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:pointer-events-none disabled:opacity-50"
                disabled={!pagination.hasPreviousPage}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Previous
              </button>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:pointer-events-none disabled:opacity-50"
                disabled={!pagination.hasNextPage}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        }
        title="System Logs"
      />
    </section>
  );
}
