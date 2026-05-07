import DataTable from "@/components/data-table";

const users = [
  {
    id: "USR-1001",
    name: "Ava Martinez",
    email: "ava.martinez@bxtrack.dev",
    role: "Admin",
    status: "Active",
    lastLogin: "07 May 2026",
  },
  {
    id: "USR-1002",
    name: "Liam Carter",
    email: "liam.carter@bxtrack.dev",
    role: "Manager",
    status: "Active",
    lastLogin: "06 May 2026",
  },
  {
    id: "USR-1003",
    name: "Noah Brooks",
    email: "noah.brooks@bxtrack.dev",
    role: "Support",
    status: "Pending",
    lastLogin: "04 May 2026",
  },
  {
    id: "USR-1004",
    name: "Emma Reed",
    email: "emma.reed@bxtrack.dev",
    role: "Analyst",
    status: "Inactive",
    lastLogin: "29 Apr 2026",
  },
];

export default function UsersPage() {
  return (
    <section className="space-y-6">
      <DataTable
        columns={[
          {
            header: "User",
            render: (user) => (
              <div>
                <p className="font-medium text-zinc-950">{user.name}</p>
                <p className="mt-1 text-xs text-zinc-500">{user.id}</p>
              </div>
            ),
          },
          {
            header: "Email",
            render: (user) => user.email,
          },
          {
            header: "Role",
            render: (user) => user.role,
          },
          {
            header: "Status",
            render: (user) => (
              <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                {user.status}
              </span>
            ),
          },
          {
            header: "Last Login",
            render: (user) => user.lastLogin,
          },
        ]}
        description="Demo data rendered with the current protected page structure."
        rows={users}
        title="User Directory"
      />
    </section>
  );
}
