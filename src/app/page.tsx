import { api } from "~/trpc/server";
import { InvestigationCard } from "~/components/investigation-card";
import type { Investigation } from "@prisma/client";

export default async function HomePage() {
  const result = await api.investigation.getPublished({ limit: 12 });
  const items = (result?.items ?? []) as Investigation[];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Aktuelle Fahndungen</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <InvestigationCard key={item.id} investigation={item} />
        ))}
      </div>
    </div>
  );
}
