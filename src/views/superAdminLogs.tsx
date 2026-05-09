import DataTable from "@/src/components/dataTable";

type SuperAdminLog = {
  id: string;
  actor: string;
  action: string;
  entity: string;
  timestamp: string;
};

const logs: SuperAdminLog[] = [];

export default function SuperAdminLogsPage() {
  return (
    <section className="space-y-6">
      <DataTable
        columns={[
          {
            header: "Actor",
            render: (log) => log.actor,
          },
          {
            header: "Action",
            render: (log) => log.action,
          },
          {
            header: "Entity",
            render: (log) => log.entity,
          },
          {
            header: "Timestamp",
            render: (log) => log.timestamp,
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
