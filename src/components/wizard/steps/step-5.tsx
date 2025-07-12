"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizard } from "../wizard-context";
import { step5Schema } from "~/lib/validations";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { z } from "zod";
import { investigationSchema } from "~/lib/validations";

type WizardData = z.infer<typeof investigationSchema>;

export function Step5() {
  const { data, updateData, prevStep } = useWizard();
  
  const form = useForm({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      contactPhone: data.contactPhone ?? "",
      contactEmail: data.contactEmail ?? "",
    },
  });

  const onSubmit = (values: Partial<WizardData>) => {
    updateData(values);
    // TODO: Submit to API
    console.log("Final data:", { ...data, ...values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kontakt-Telefon (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Telefonnummer für Rückfragen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kontakt-E-Mail (optional)</FormLabel>
              <FormControl>
                <Input placeholder="E-Mail für Rückfragen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep}>
            Zurück
          </Button>
          <Button type="submit">Fahndung erstellen</Button>
        </div>
      </form>
    </Form>
  );
} 