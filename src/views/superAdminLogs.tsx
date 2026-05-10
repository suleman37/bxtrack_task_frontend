"use client";

import { useSelector } from "react-redux";
import { selectLogs } from "@/app/slices/log.slice";
import DataTable from "@/src/components/dataTable";

export default function SuperAdminLogsPage() {
  const logs = useSelector(selectLogs);

  return (
    <section className="space-y-6">
      <DataTable
        columns={[
          {
            header: "Index",
            render: (_, rowIndex) => rowIndex + 1,
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
        title="System Logs"
      />
    </section>
  );
}
