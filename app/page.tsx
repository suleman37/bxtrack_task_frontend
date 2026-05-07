import { redirect } from "next/navigation";
import { R } from "@/constants/R";

export default function Page() {
  redirect(R.auth.prefix);
}