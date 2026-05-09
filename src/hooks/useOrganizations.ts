"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectUsers } from "@/app/slices/user.slice";
import type { AppDispatch } from "@/app/store";
import type { UserModel } from "@/models/user.model";

export default function useOrganizations() {
  const dispatch = useDispatch<AppDispatch>();
  const organizations = useSelector(selectUsers).filter(
    (user: UserModel) => user.organizationName
  ) as UserModel[];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return {
    organizations,
  };
}
