"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { cn } from "@/lib/cn";
import type {
  FormActionsProps,
  FormControlProps,
  FormFieldContextValue,
  FormItemProps,
  FormLabelProps,
  FormMessageProps,
} from "@/models/form.model";

const Form = FormProvider;

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormItemContext = React.createContext<{ id: string }>({ id: "" });

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    id: itemContext.id,
    error: fieldState.error,
    formItemId: `${itemContext.id}-form-item`,
    formMessageId: `${itemContext.id}-form-item-message`,
  };
}

export function FormItem({ className, ...props }: FormItemProps) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
}

export function FormLabel({ className, ...props }: FormLabelProps) {
  const { error, formItemId } = useFormField();

  return (
    <label
      className={cn(
        "block text-sm font-medium text-zinc-700",
        error && "text-red-600",
        className
      )}
      htmlFor={formItemId}
      {...props}
    />
  );
}

export function FormControl({ className, ...props }: FormControlProps) {
  const { formItemId, formMessageId, error } = useFormField();

  return (
    <div
      aria-describedby={error ? formMessageId : undefined}
      aria-invalid={Boolean(error)}
      className={cn(className)}
      id={formItemId}
      {...props}
    />
  );
}

export function FormMessage({ className, children, ...props }: FormMessageProps) {
  const { error, formMessageId } = useFormField();
  const body = error?.message ? String(error.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      className={cn("text-sm text-red-600", className)}
      id={formMessageId}
      {...props}
    >
      {body}
    </p>
  );
}

export function FormActions({ className, ...props }: FormActionsProps) {
  return (
    <div className={cn("flex items-center justify-end", className)} {...props} />
  );
}

export { Form };
