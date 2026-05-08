"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Button from "@/components/button";
import Card, {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
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
import { R } from "@/constants/R";
import { cn } from "@/lib/cn";
import { customerSchema, type CustomerFormType } from "@/schemas/customer.dto";

export default function AddCustomerPage() {
  const router = useRouter();
  const form = useForm<CustomerFormType>({
    resolver: yupResolver(customerSchema),
  });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-zinc-950">
            Add Customer
          </h3>
          <p className="mt-1 text-sm text-zinc-600">
            Create a customer with name, email, phone, organization ID, and assigned user.
          </p>
        </div>

        <Link
          href={R.protected.customers}
          className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950"
        >
          Back to customers
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
          <CardDescription>
            Fill in the fields below to add a new customer.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              className="space-y-4"
              noValidate
              onSubmit={form.handleSubmit(() => {
                router.push(R.protected.customers);
              })}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter customer name"
                          className={cn(
                            fieldState.error && "border-red-600 focus:border-red-600"
                          )}
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
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter customer email"
                          className={cn(
                            fieldState.error && "border-red-600 focus:border-red-600"
                          )}
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
                  name="phone"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter customer phone"
                          className={cn(
                            fieldState.error && "border-red-600 focus:border-red-600"
                          )}
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
                  name="organizationId"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Organization ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter organization ID"
                          className={cn(
                            fieldState.error && "border-red-600 focus:border-red-600"
                          )}
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
                  name="assignedTo"
                  render={({ field, fieldState }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Assigned To</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter assigned user"
                          className={cn(
                            fieldState.error && "border-red-600 focus:border-red-600"
                          )}
                          {...field}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormActions className="gap-3">
                <Link
                  href={R.protected.customers}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 px-5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
                >
                  Cancel
                </Link>
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                >
                  Add Customer
                </Button>
              </FormActions>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
