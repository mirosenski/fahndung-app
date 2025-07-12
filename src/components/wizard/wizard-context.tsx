"use client";

import { createContext, useContext, useState } from "react";
import type { z } from "zod";
import { investigationSchema } from "~/lib/validations";

type WizardData = z.infer<typeof investigationSchema>;

interface WizardContextType {
  data: Partial<WizardData>;
  currentStep: number;
  updateData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const WizardContext = createContext<WizardContextType | null>(null);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Partial<WizardData>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const updateData = (newData: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => Math.max(0, prev - 1));

  return (
    <WizardContext.Provider
      value={{ data, currentStep, updateData, nextStep, prevStep }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (!context) throw new Error("useWizard must be used within WizardProvider");
  return context;
}; 