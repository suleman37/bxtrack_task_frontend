import DataTable from "@/src/components/dataTable";

type SuperAdminOrganization = {
  id: string;
  name: string;
  status: string;
  users: number;
  owner: string;
};

const organizations: SuperAdminOrganization[] = [
];

export default function SuperAdminOrganizationsPage() {
  return (
    <section className="space-y-6">
      <DataTable
        columns={[
          {
            header: "Organization",
            render: (organization) => organization.name,
          },
          {
            header: "Owner",
            render: (organization) => organization.owner,
          },
          {
            header: "Users",
            render: (organization) => organization.users,
          },
          {
            header: "Status",
            render: (organization) => organization.status,
          },
        ]}
        description="Monitor organizations from the super admin workspace."
        emptyMessage="No organizations available yet."
        rows={organizations}
        title="Organizations"
      />
    </section>
  );
}
