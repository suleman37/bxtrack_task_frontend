import Link from "next/link";
import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { R } from "@/constants/R";

const summaryCards = [
  {
    id: "organizations",
    label: "Organizations",
    description: "View and manage organizations from the super admin workspace.",
    href: R.protected.superAdmin.organizations,
    cta: "Open organizations",
  },
  {
    id: "logs",
    label: "Audit Logs",
    description: "Inspect platform-wide audit activity and system events.",
    href: R.protected.superAdmin.logs,
    cta: "Open logs",
  },
];

export default function SuperAdminDashboardPage() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {summaryCards.map((item) => (
          <Link key={item.id} href={item.href} className="group block">
            <Card className="h-full transition-transform transition-shadow group-hover:-translate-y-0.5 group-hover:shadow-md">
              <CardHeader>
                <CardTitle>{item.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
                <p className="text-sm font-medium text-zinc-950">{item.cta}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
