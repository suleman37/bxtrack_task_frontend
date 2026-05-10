"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectUsers } from "@/app/slices/user.slice";
import type { AppDispatch } from "@/app/store";
import Button from "@/components/button";
import Card, {
  CardContent
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
import { UserRole } from "@/enums/userRole.enum";
import { cn } from "@/lib/cn";
import { customerSchema, type CustomerFormType } from "@/schemas/customer.dto";

type CustomerFormProps = {
  cancelHref: string;
  isSubmitting?: boolean;
  onSubmit: (values: CustomerFormType) => void | Promise<void>;
};

export default function CustomerForm({
  cancelHref,
  isSubmitting,
  onSubmit,
}: CustomerFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const form = useForm<CustomerFormType>({
    resolver: yupResolver(customerSchema),
  });
  const assignableUsers = users.filter((user) => user.role === UserRole.User);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

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
                name="assignedTo"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Assigned To</FormLabel>
                    <FormControl>
                      <select
                        className={cn(
                          "h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-950 outline-none transition-colors focus:border-zinc-950",
                          fieldState.error && "border-red-600 focus:border-red-600"
                        )}
                        onChange={(event) => {
                          const value = event.target.value;
                          field.onChange(value === "" ? undefined : Number(value));
                        }}
                        value={field.value ?? ""}
                      >
                        <option value="">Select assigned user</option>
                        {assignableUsers.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            <FormActions className="gap-3">
              <Link
                href={cancelHref}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 px-5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
              >
                Cancel
              </Link>
              <Button
                disabled={isSubmitting || form.formState.isSubmitting}
                type="submit"
              >
                Add Customer
              </Button>
            </FormActions>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
