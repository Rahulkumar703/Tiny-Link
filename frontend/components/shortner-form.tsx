"use client";

import React from "react";
import { Loader2, Link2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { createLink } from "@/services";
import { useLinks } from "@/context/LinksContext";

const urlSchema = z.object({
  url: z
    .url({
      error: "Invalid URL format",
    })
    .nonempty("URL to be shortened is required"),
  code: z
    .string()
    .regex(/^[A-Za-z0-9]{6,8}$/, "6-8 characters. Only A-Z, a-z, 0-9")
    .optional()
    .or(z.literal("")),
});

type UrlFormValues = z.infer<typeof urlSchema>;

const ShortnerForm: React.FC = () => {
  const { setLinks } = useLinks();

  const form = useForm<UrlFormValues>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: "",
      code: "",
    },
  });

  const onSubmit = async (values: UrlFormValues) => {
    try {
      const res = await createLink(values.url, values.code || null);

      if (!res.ok) {
        toast.error(res.message ?? "Failed to create short link.");
        if (res?.errors) {
          res.errors.forEach((error) => {
            form.setError(error.path as keyof UrlFormValues, {
              type: "manual",
              message: error.message,
            });
          });
        }
        return;
      }

      setLinks((prev) => [...prev, res.data!]);

      toast.success(`Short link created successfully. Code: ${res.data?.code}`);
      form.reset();
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("An unexpected error occurred. Unable to create short link.");
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Card id="create-link" className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Link2 className="h-4 w-4" />
          Create a Short Link
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            {/* Long URL */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Long URL <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/my-page"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Custom Code */}
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Code (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., docs123"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating…
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ShortnerForm;
