import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-md text-center">
        <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-primary" />
        <h1 className="mb-2 text-xl font-semibold">Laden...</h1>
        <p className="text-muted-foreground">
          Die Seite wird geladen, bitte warten Sie einen Moment.
        </p>
      </div>
    </div>
  );
} 