"use client";

import { Search } from "lucide-react";
import Input from "@/components/input";
import type { TableSearchInputProps } from "@/models/tableSearchInputProps.model";

export default function TableSearchInput({
  onChange,
  placeholder = "Search",
  value = "",
}: TableSearchInputProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
      <Input
        className="pl-9"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}
