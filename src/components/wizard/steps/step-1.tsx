"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWizard } from "../wizard-context";
import { step1Schema } from "~/lib/validations";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export function Step1() {
  const { data, updateData, nextStep } = useWizard();
  
  const form = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      category: data.category ?? undefined,
      priority: data.priority ?? "NORMAL",
    },
  });

  const onSubmit = (values: any) => {
    updateData(values);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fallkategorie</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategorie wählen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="WANTED_PERSON">Straftäter</SelectItem>
                  <SelectItem value="MISSING_PERSON">Vermisste Person</SelectItem>
                  <SelectItem value="UNKNOWN_DEAD">Unbekannte Tote</SelectItem>
                  <SelectItem value="STOLEN_GOODS">Gesuchte Sachen</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priorität</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="NORMAL">Normal</SelectItem>
                  <SelectItem value="URGENT">Eilfahndung</SelectItem>
                  <SelectItem value="CRITICAL">Kritisch</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Weiter</Button>
        </div>
      </form>
    </Form>
  );
} 