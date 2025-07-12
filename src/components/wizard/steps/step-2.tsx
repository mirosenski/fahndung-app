"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizard } from "../wizard-context";
import { step2Schema } from "~/lib/validations";
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
import { Textarea } from "~/components/ui/textarea";
import type { z } from "zod";
import type { investigationSchema } from "~/lib/validations";

type WizardData = z.infer<typeof investigationSchema>;

export function Step2() {
  const { data, updateData, nextStep, prevStep } = useWizard();
  
  const form = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      title: data.title ?? "",
      shortInfo: data.shortInfo ?? "",
      location: data.location ?? "",
      date: data.date ? new Date(data.date) : new Date(),
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titel der Fahndung</FormLabel>
              <FormControl>
                <Input placeholder="Kurzer, prägnanter Titel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kurze Beschreibung (optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Kurze Zusammenfassung für die Kartenansicht"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ort</FormLabel>
              <FormControl>
                <Input placeholder="Stadt, Landkreis oder Region" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Datum</FormLabel>
              <FormControl>
                <Input 
                  type="date" 
                  {...field} 
                  value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value}
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