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
import { UserRole } from "@/enums/userRole.enum";
import { cn } from "@/lib/cn";
import { userSchema, type UserFormType } from "@/schemas/user.dto";

const roleOptions = Object.values(UserRole);

export default function AddUserPage() {
  const router = useRouter();
  const form = useForm<UserFormType>({
    resolver: yupResolver(userSchema),
  });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-zinc-950">
            Add User
          </h3>
          <p className="mt-1 text-sm text-zinc-600">
            Create a user with name, email, and role.
          </p>
        </div>

        <Link
          href={R.protected.user}
          className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950"
        >
          Back to users
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <CardDescription>
            Fill in the fields below to add a new user.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              className="space-y-4"
              noValidate
              onSubmit={form.handleSubmit(() => {
                router.push(R.protected.user);
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
                  href={R.protected.user}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 px-5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
                >
                  Cancel
                </Link>
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                >
                  Add User
                </Button>
              </FormActions>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
