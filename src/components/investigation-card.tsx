import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { formatDate } from "~/lib/utils";
import type { Investigation } from "@prisma/client";

export function InvestigationCard({ investigation }: { investigation: Investigation }) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="aspect-video bg-gray-200">
        {investigation.imageUrl && (
          <img 
            src={investigation.imageUrl} 
            alt={investigation.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <Badge variant={investigation.priority === "URGENT" ? "destructive" : "default"}>
            {investigation.priority === "URGENT" ? "EILFAHNDUNG" : "NEU"}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {investigation.category.replace("_", " ")}
          </span>
        </div>
        <h3 className="font-semibold">{investigation.title}</h3>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground">{investigation.location}</p>
        <p className="text-sm text-muted-foreground">
          {formatDate(investigation.date)}
        </p>
      </CardContent>
      
      <CardFooter>
        <Link 
          href={`/fahndung/${investigation.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Mehr erfahren →
        </Link>
      </CardFooter>
    </Card>
  );
} 