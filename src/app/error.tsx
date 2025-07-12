"use client";

import { useEffect } from "react";
import { Button } from "~/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-2xl font-bold text-destructive">
          Ein Fehler ist aufgetreten
        </h1>
        <p className="mb-6 text-muted-foreground">
          Es gab ein Problem beim Laden der Seite. Bitte versuchen Sie es erneut.
        </p>
        <div className="space-x-4">
          <Button onClick={reset} variant="default">
            Erneut versuchen
          </Button>
          <Button onClick={() => window.location.href = "/"} variant="outline">
            Zur Startseite
          </Button>
        </div>
      </div>
    </div>
  );
} 