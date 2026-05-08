"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
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
import { UserRole } from "@/enums/userRole.enum";
import { cn } from "@/lib/cn";
import { userSchema, type UserFormType } from "@/schemas/user.dto";

const roleOptions = Object.values(UserRole);

type UserFormProps = {
  cancelHref: string;
  isSubmitting?: boolean;
  onSubmit: (values: UserFormType) => void | Promise<void>;
};

export default function UserForm({
  cancelHref,
  isSubmitting,
  onSubmit,
}: UserFormProps) {
  const form = useForm<UserFormType>({
    resolver: yupResolver(userSchema),
  });

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
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        value={field.value}
                        className={cn(
                          "h-11 w-full rounded-[8px] border border-zinc-200 bg-white px-3 text-sm text-zinc-950 outline-none transition-colors focus:border-zinc-950"
                        )}
                      >
                        <option value="">Select role</option>
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
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
                Add User
              </Button>
            </FormActions>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
