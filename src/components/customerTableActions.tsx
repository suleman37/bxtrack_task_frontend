"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectActingOrganizationId } from "@/app/slices/auth.slice";
import { fetchCustomers } from "@/app/slices/customer.slice";
import type { AppDispatch } from "@/app/store";
import CustomerNotesModal from "@/components/customerNotesModal";
import { endpoints } from "@/constants/endpoints";
import DeleteAction from "@/components/deleteAction";
import NoteAction from "@/components/noteAction";
import { isSuperAdminRole, normalizeUserRole } from "@/lib/auth";
import {
  getActingOrganizationIdCookie,
  getAuthRoleCookie,
  getAuthTokenCookie,
} from "@/services/cookie.service";
import {
  useCreateCustomerNoteMutation,
  useDeleteCustomerMutation,
} from "@/services/customer.service";

type CustomerTableActionsProps = {
  customerId: number;
  customerName: string;
};

type CustomerNoteInput = {
  notes: string;
  isSaved: boolean;
};

type CustomerNotesResponse =
  | { notes?: string; data?: unknown }
  | { notes?: string }[]
  | string[]
  | unknown;

export default function CustomerTableActions({
  customerId,
  customerName,
}: CustomerTableActionsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const actingOrganizationId = useSelector(selectActingOrganizationId);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [notes, setNotes] = useState<CustomerNoteInput[]>([
    { notes: "", isSaved: false },
  ]);
  const [createCustomerNote, { isLoading: isSavingNotes }] =
    useCreateCustomerNoteMutation();
  const [deleteCustomer, { isLoading: isDeletingCustomer }] =
    useDeleteCustomerMutation();

  async function handleDeleteCustomer() {
    await deleteCustomer(customerId).unwrap();
    dispatch(fetchCustomers(true));
  }

  function normalizeNotesResponse(payload: CustomerNotesResponse) {
    const list = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.data)
        ? payload.data
        : [];

    const normalizedNotes = list
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (
          typeof item === "object" &&
          item !== null &&
          "notes" in item &&
          typeof item.notes === "string"
        ) {
          return item.notes;
        }

        return "";
      })
      .filter((note) => note.trim().length > 0)
      .map((note) => ({ notes: note, isSaved: true }));

    return normalizedNotes.length > 0
      ? normalizedNotes
      : [{ notes: "", isSaved: false }];
  }

  async function handleOpenNotes() {
    setIsNotesOpen(true);
    setIsLoadingNotes(true);

    try {
      const token = getAuthTokenCookie();
      const role = normalizeUserRole(getAuthRoleCookie());
      const fallbackActingOrgId = getActingOrganizationIdCookie();
      const organizationId =
        actingOrganizationId ?? (fallbackActingOrgId ? Number(fallbackActingOrgId) : null);
      const headers = new Headers({
        "Content-Type": "application/json",
      });

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      if (
        token &&
        isSuperAdminRole(role) &&
        organizationId !== null &&
        Number.isFinite(organizationId)
      ) {
        headers.set("X-Organization-Id", String(organizationId));
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${endpoints.customers.getNotes.replace(
          ":id",
          String(customerId)
        )}`,
        {
          headers,
          method: "GET",
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error();
      }

      setNotes(normalizeNotesResponse(data));
    } catch {
      toast.error("Failed to load notes");
      setNotes((previousNotes) =>
        previousNotes.length ? previousNotes : [{ notes: "", isSaved: false }]
      );
    } finally {
      setIsLoadingNotes(false);
    }
  }

  function handleCloseNotes() {
    setIsNotesOpen(false);
  }

  function handleAddNote() {
    setNotes((previousNotes) => [
      ...previousNotes,
      { notes: "", isSaved: false },
    ]);
  }

  function handleChangeNote(index: number, value: string) {
    setNotes((previousNotes) =>
      previousNotes.map((note, noteIndex) =>
        noteIndex === index ? { ...note, notes: value } : note
      )
    );
  }

  function handleRemoveNote(index: number) {
    setNotes((previousNotes) => {
      const remainingNotes = previousNotes.filter(
        (_, noteIndex) => noteIndex !== index
      );

      return remainingNotes.length > 0
        ? remainingNotes
        : [{ notes: "", isSaved: false }];
    });
  }

  async function handleSaveNotes() {
    const payload = notes
      .filter((note) => !note.isSaved)
      .map((note) => note.notes.trim())
      .filter((note) => note.length > 0);

    if (!payload.length) {
      handleCloseNotes();
      return;
    }

    await Promise.all(
      payload.map((note) =>
        createCustomerNote({ customerId, notes: note }).unwrap()
      )
    );

    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.notes.trim() ? { ...note, isSaved: true } : note
      )
    );
    handleCloseNotes();
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <NoteAction ariaLabel="Customer notes" onClick={handleOpenNotes} />
        <DeleteAction
          ariaLabel="Delete customer"
          disabled={isDeletingCustomer}
          onClick={handleDeleteCustomer}
        />
      </div>

      <CustomerNotesModal
        isOpen={isNotesOpen}
        customerName={customerName}
        isSaving={isSavingNotes || isLoadingNotes}
        notes={notes.map((note) => note.notes)}
        onAddNote={handleAddNote}
        onChangeNote={handleChangeNote}
        onClose={handleCloseNotes}
        onRemoveNote={handleRemoveNote}
        onSave={handleSaveNotes}
      />
    </>
  );
}
