"use client";

import { WizardProvider } from "~/components/wizard/wizard-context";
import { WizardForm } from "~/components/wizard/wizard-form";

export default function WizardPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Neue Fahndung erstellen</h1>
      
      <WizardProvider>
        <WizardForm />
      </WizardProvider>
    </div>
  );
} 