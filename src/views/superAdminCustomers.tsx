import DataTable from "@/src/components/dataTable";
import type { CustomerModel } from "@/models/customer.model";

const customers: CustomerModel[] = [];

export default function SuperAdminCustomersPage() {
  return (
    <section className="space-y-6">
      <DataTable
        columns={[
          {
            header: "Name",
            render: (customer) => customer.name,
          },
          {
            header: "Email",
            render: (customer) => customer.email,
          },
          {
            header: "Phone",
            render: (customer) => customer.phone,
          },
          {
            header: "Organization ID",
            render: (customer) => customer.organizationId,
          },
          {
            header: "Assigned To",
            render: (customer) => customer.assignedTo,
          },
        ]}
        description="Monitor customers across organizations from the super admin workspace."
        emptyMessage="No customer accounts available yet."
        rows={customers}
        title="Customer Accounts"
      />
    </section>
  );
}
