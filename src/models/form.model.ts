import type { HTMLAttributes, LabelHTMLAttributes } from "react";
import type {
  FieldPath,
  FieldValues,
} from "react-hook-form";

export type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement>;
export type FormControlProps = HTMLAttributes<HTMLDivElement>;
export type FormItemProps = HTMLAttributes<HTMLDivElement>;
export type FormMessageProps = HTMLAttributes<HTMLParagraphElement>;
export type FormActionsProps = HTMLAttributes<HTMLDivElement>;

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};
