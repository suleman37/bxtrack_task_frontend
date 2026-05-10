import { cn } from "@/lib/cn";
import type { ButtonProps } from "@/models/buttonProps.model";

export default function Button({
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-[8px] bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
