"use client";

import { yupResolver } from "@hookform/resolvers/yup";
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
import { loginSchema, type LoginFormType } from "@/schemas/login.dto";

type LoginFormProps = {
  onSubmit: (values: LoginFormType) => void | Promise<void>;
  isSubmitting?: boolean;
};

export default function LoginPage({ onSubmit, isSubmitting }: LoginFormProps) {
  const form = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-10">
      <Card className="w-full max-w-md border-zinc-200">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email and password to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-[10px]"
              noValidate
              onSubmit={form.handleSubmit(async (values) => {
                await onSubmit(values);
              })}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1.5 text-left">
                    <FormLabel className="sr-only">Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        className="h-10 rounded-[5px] border-zinc-300 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 placeholder:opacity-100 shadow-none focus:border-[#167d77] focus-visible:outline-[#167d77]"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage className="px-2 text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-1.5 text-left">
                    <FormLabel className="sr-only">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className="h-10 rounded-[5px] border-zinc-300 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 placeholder:opacity-100 shadow-none focus:border-[#167d77] focus-visible:outline-[#167d77]"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage className="px-2 text-xs" />
                  </FormItem>
                )}
              />
              <FormActions>
                <Button
                  className="w-full cursor-pointer"
                  disabled={isSubmitting || form.formState.isSubmitting}
                  type="submit"
                >
                  Login
                </Button>
              </FormActions>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
