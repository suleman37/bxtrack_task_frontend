"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Button from "@/components/button";
import Card, { CardContent } from "@/components/card";
import {
  Form,
  FormActions,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import Input from "@/components/input";
import useOrganizationForm from "@/hooks/useOrganizationForm";
import usePasswordVisibility from "@/hooks/usePasswordVisibility";
import type { OrganizationFormProps } from "@/models/organizationFormProps.model";

export default function OrganizationForm({
  cancelHref,
  isSubmitting,
  onSubmit,
}: OrganizationFormProps) {
  const form = useOrganizationForm();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4 pt-5"
            noValidate
            onSubmit={form.handleSubmit(async (values) => {
              await onSubmit(values);
            })}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="organizationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter organization name"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter user name"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter user email"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter user password"
                          className="pr-11"
                          {...field}
                          value={field.value}
                        />
                        <button
                          type="button"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 inline-flex w-11 items-center justify-center text-zinc-500 transition-colors hover:text-zinc-950"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormActions className="gap-3">
              <Link
                href={cancelHref}
                className="inline-flex h-11 items-center justify-center rounded-[8px] border border-zinc-200 px-5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
              >
                Cancel
              </Link>
              <Button
                disabled={isSubmitting || form.formState.isSubmitting}
                type="submit"
              >
                Add Organization
              </Button>
            </FormActions>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
