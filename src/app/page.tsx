import { api } from "~/trpc/server";
import { InvestigationCard } from "~/components/investigation-card";
import type { RouterOutputs } from "~/trpc/react";

type InvestigationList = RouterOutputs["investigation"]["getPublished"];

export default async function HomePage() {
  try {
    const result = await api.investigation.getPublished({ limit: 12 });
    const items = result?.items ?? [];

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Aktuelle Fahndungen</h1>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item: InvestigationList["items"][0]) => (
            <InvestigationCard key={item.id} investigation={item} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading investigations:", error);
    
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Aktuelle Fahndungen</h1>
        
        <div className="rounded-lg border p-6">
          <p className="text-muted-foreground">
            Momentan sind keine Fahndungen verfügbar.
          </p>
        </div>
      </div>
    );
  }
}
