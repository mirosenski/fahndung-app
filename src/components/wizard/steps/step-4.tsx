"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizard } from "../wizard-context";
import { step4Schema } from "~/lib/validations";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import type { z } from "zod";
import type { investigationSchema } from "~/lib/validations";

type WizardData = z.infer<typeof investigationSchema>;

export function Step4() {
  const { data, updateData, nextStep, prevStep } = useWizard();
  
  const form = useForm({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      description: data.description ?? "",
      mainQuestion: data.mainQuestion ?? "",
    },
  });

  const onSubmit = (values: Partial<WizardData>) => {
    updateData(values);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detaillierte Beschreibung (optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Ausführliche Beschreibung des Falls"
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mainQuestion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hauptfrage (optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Was ist die wichtigste Frage, die beantwortet werden soll?"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep}>
            Zurück
          </Button>
          <Button type="submit">Weiter</Button>
        </div>
      </form>
    </Form>
  );
} 