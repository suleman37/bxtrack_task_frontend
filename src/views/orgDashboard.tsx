"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setActingOrganizationId } from "@/app/slices/auth.slice";
import type { AppDispatch } from "@/app/store";
import DashboardPage from "@/views/dashboard";

export default function OrgDashboardPage() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const rawId = params?.id;
  const id =
    typeof rawId === "string" ? parseInt(rawId, 10) : Number.NaN;

  useEffect(() => {
    if (!Number.isFinite(id) || id < 1) return;
    dispatch(setActingOrganizationId(id));
  }, [dispatch, id]);

  return <DashboardPage />;
}
