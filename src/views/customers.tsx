import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import DataTable from "@/components/data-table";

const customers = [
  {
    id: "CST-2401",
    name: "Northwind Logistics",
    contact: "Harper Cole",
    tier: "Enterprise",
    status: "Active",
    region: "United States",
  },
  {
    id: "CST-2402",
    name: "Atlas Retail Group",
    contact: "Mason Lee",
    tier: "Growth",
    status: "Onboarding",
    region: "Canada",
  },
  {
    id: "CST-2403",
    name: "Summit Health Co.",
    contact: "Sophia Turner",
    tier: "Enterprise",
    status: "Active",
    region: "United Kingdom",
  },
  {
    id: "CST-2404",
    name: "Brightline Foods",
    contact: "Lucas Bennett",
    tier: "Starter",
    status: "At Risk",
    region: "Australia",
  },
];

export default function CustomersPage() {
  return (
    <section className="space-y-6">
      <DataTable
        columns={[
          {
            header: "Customer",
            render: (customer) => (
              <div>
                <p className="font-medium text-zinc-950">{customer.name}</p>
                <p className="mt-1 text-xs text-zinc-500">{customer.id}</p>
              </div>
            ),
          },
          {
            header: "Primary Contact",
            render: (customer) => customer.contact,
          },
          {
            header: "Tier",
            render: (customer) => customer.tier,
          },
          {
            header: "Region",
            render: (customer) => customer.region,
          },
          {
            header: "Status",
            render: (customer) => (
              <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                {customer.status}
              </span>
            ),
          },
        ]}
        description="Demo customer records rendered in a reusable table card."
        rows={customers}
        title="Customer Accounts"
      />
    </section>
  );
}
