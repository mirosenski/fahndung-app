"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizard } from "../wizard-context";
import { step3Schema } from "~/lib/validations";
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

export function Step3() {
  const { data, updateData, nextStep, prevStep } = useWizard();
  
  const form = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      age: data.age ?? "",
      height: data.height ?? "",
      features: data.features ?? "",
      clothing: data.clothing ?? "",
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
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alter (optional)</FormLabel>
              <FormControl>
                <Input placeholder="z.B. 25-30 Jahre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Größe (optional)</FormLabel>
              <FormControl>
                <Input placeholder="z.B. 175-180 cm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Besondere Merkmale (optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tattoos, Narben, Haarfarbe, etc."
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clothing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kleidung (optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Beschreibung der Kleidung"
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