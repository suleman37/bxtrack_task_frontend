import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardSectionProps = HTMLAttributes<HTMLDivElement>;
type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;
type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

export function Card({ className, ...props }: CardSectionProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-black/10 bg-white p-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardSectionProps) {
  return (
    <div
      className={cn("mb-5 flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn("text-xl font-semibold tracking-tight text-zinc-950", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: CardDescriptionProps) {
  return (
    <p className={cn("text-sm leading-6 text-zinc-600", className)} {...props} />
  );
}

export function CardContent({ className, ...props }: CardSectionProps) {
  return <div className={cn("space-y-4", className)} {...props} />;
}

export function CardFooter({ className, ...props }: CardSectionProps) {
  return (
    <div
      className={cn("mt-6 flex items-center justify-end gap-3", className)}
      {...props}
    />
  );
}

export default Card;
