"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs, selectLogs } from "@/app/slices/log.slice";
import type { AppDispatch } from "@/app/store";
import DataTable from "@/src/components/dataTable";

export default function SuperAdminLogsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const logs = useSelector(selectLogs);

  useEffect(() => {
    dispatch(fetchLogs(true));
  }, [dispatch]);

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
