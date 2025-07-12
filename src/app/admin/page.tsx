import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default async function AdminDashboard() {
  // TODO: Implement proper auth check
  // const session = await getServerAuthSession();
  // if (!session) {
  //   redirect("/api/auth/signin");
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/wizard">
          <Button>Neue Fahndung erstellen</Button>
        </Link>
      </div>
      
      {/* Hier später: Liste aller Fahndungen */}
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Alle Fahndungen</h2>
        <p className="text-muted-foreground">
          Hier werden alle Fahndungen angezeigt (noch nicht implementiert).
        </p>
      </div>
    </div>
  );
} 