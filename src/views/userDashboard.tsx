import Link from "next/link";
import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { R } from "@/constants/R";

const userCards = [
  {
    id: "customers",
    label: "Customers",
    description: "Review and manage customer accounts from the user workspace.",
    href: R.protected.userPanel.customers,
    cta: "Open customers",
  },
];

export default function UserDashboardPage() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {userCards.map((item) => (
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
