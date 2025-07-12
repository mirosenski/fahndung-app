"use client";

import { useWizard } from "./wizard-context";
import { Step1 } from "./steps/step-1";
import { Step2 } from "./steps/step-2";
import { Step3 } from "./steps/step-3";
import { Step4 } from "./steps/step-4";
import { Step5 } from "./steps/step-5";
import { Progress } from "~/components/ui/progress";

const steps = [
  { component: Step1, title: "Grunddaten" },
  { component: Step2, title: "Karteninfos" },
  { component: Step3, title: "Personenbeschreibung" },
  { component: Step4, title: "Falldetails" },
  { component: Step5, title: "Kontakt & Veröffentlichung" },
];

export function WizardForm() {
  const { currentStep } = useWizard();
  const CurrentStepComponent = steps[currentStep]?.component;
  
  if (!CurrentStepComponent) return null;

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Schritt {currentStep + 1} von {steps.length}</span>
          <span>{steps[currentStep]?.title}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Current Step */}
      <CurrentStepComponent />
    </div>
  );
} 