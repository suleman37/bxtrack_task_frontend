"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActingOrganizationId } from "@/app/slices/auth.slice";
import { fetchCustomers } from "@/app/slices/customer.slice";
import type { AppDispatch } from "@/app/store";
import CustomerNotesModal from "@/components/customerNotesModal";
import { endpoints } from "@/constants/endpoints";
import DeleteAction from "@/components/deleteAction";
import NoteAction from "@/components/noteAction";
import RestoreAction from "@/components/restoreAction";
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
import type { PaginationModel } from "@/models/pagination.model";
import type {
  CustomerNotesResponse,
  CustomerTableActionsProps,
} from "@/models/customerTableActions.model";
import {
  DEFAULT_PAGE_LIMIT,
  resolvePagination,
  shouldSkipPageChange,
} from "@/utility/pagination";

const initialNotesPagination: PaginationModel = {
  page: 1,
  limit: DEFAULT_PAGE_LIMIT,
  total: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};

export default function CustomerTableActions({
  customerId,
  customerName,
  customerStatus,
}: CustomerTableActionsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const actingOrganizationId = useSelector(selectActingOrganizationId);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [draftNotes, setDraftNotes] = useState<string[]>([""]);
  const [notesPagination, setNotesPagination] =
    useState<PaginationModel>(initialNotesPagination);
  const [createCustomerNote, { isLoading: isSavingNotes }] =
    useCreateCustomerNoteMutation();
  const [deleteCustomer, { isLoading: isDeletingCustomer }] =
    useDeleteCustomerMutation();
  const normalizedStatus = customerStatus?.toLowerCase().trim();
  const isDeletedCustomer =
    normalizedStatus === "delete" || normalizedStatus === "deleted";

  async function handleDeleteCustomer() {
    await deleteCustomer(customerId).unwrap();
    dispatch(fetchCustomers(true));
  }

  function normalizeNotesResponse(payload: CustomerNotesResponse) {
    let list: unknown[] = [];

    if (Array.isArray(payload)) {
      list = payload;
    } else if (
      typeof payload === "object" &&
      payload !== null &&
      "data" in payload &&
      Array.isArray(payload.data)
    ) {
      list = payload.data;
    } else if (
      typeof payload === "object" &&
      payload !== null &&
      "notes" in payload &&
      Array.isArray(payload.notes)
    ) {
      list = payload.notes;
    } else if (
      typeof payload === "object" &&
      payload !== null &&
      "items" in payload &&
      Array.isArray(payload.items)
    ) {
      list = payload.items;
    } else if (
      typeof payload === "object" &&
      payload !== null &&
      "rows" in payload &&
      Array.isArray(payload.rows)
    ) {
      list = payload.rows;
    } else if (
      typeof payload === "object" &&
      payload !== null &&
      "results" in payload &&
      Array.isArray(payload.results)
    ) {
      list = payload.results;
    } else if (
      typeof payload === "object" &&
      payload !== null &&
      "data" in payload &&
      typeof payload.data === "object" &&
      payload.data !== null
    ) {
      return normalizeNotesResponse(payload.data);
    }

    return list
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
      .filter((note) => note.trim().length > 0);
  }

  async function loadNotes(page: number) {
    setIsLoadingNotes(true);

    try {
      const token = getAuthTokenCookie();
      const role = normalizeUserRole(getAuthRoleCookie());
      const fallbackActingOrgId = getActingOrganizationIdCookie();
      const organizationId =
        actingOrganizationId ?? (fallbackActingOrgId ? Number(fallbackActingOrgId) : undefined);
      const headers = new Headers({
        "Content-Type": "application/json",
      });

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      if (
        token &&
        isSuperAdminRole(role) &&
        organizationId !== undefined &&
        Number.isFinite(organizationId)
      ) {
        headers.set("X-Organization-Id", String(organizationId));
      }

      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(DEFAULT_PAGE_LIMIT),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${endpoints.customers.getNotes.replace(
          ":id",
          String(customerId)
        )}?${queryParams.toString()}`,
        {
          headers,
          method: "GET",
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error();
      }

      const normalizedNotes = normalizeNotesResponse(data);

      setSavedNotes(normalizedNotes);
      setNotesPagination(
        resolvePagination(data, normalizedNotes.length, page, DEFAULT_PAGE_LIMIT)
      );
    } catch {
      setSavedNotes([]);
      setNotesPagination({
        ...initialNotesPagination,
        page,
        hasPreviousPage: page > 1,
      });
    } finally {
      setIsLoadingNotes(false);
    }
  }

  async function handleOpenNotes() {
    setIsNotesOpen(true);
    setDraftNotes([""]);
    await loadNotes(1);
  }

  function handleCloseNotes() {
    setIsNotesOpen(false);
  }

  function handleAddNote() {
    setDraftNotes((previousNotes) => [...previousNotes, ""]);
  }

  function handleChangeNote(index: number, value: string) {
    setDraftNotes((previousNotes) =>
      previousNotes.map((note, noteIndex) =>
        noteIndex === index ? value : note
      )
    );
  }

  function handleRemoveNote(index: number) {
    setDraftNotes((previousNotes) => {
      const remainingNotes = previousNotes.filter(
        (_, noteIndex) => noteIndex !== index
      );

      return remainingNotes.length > 0 ? remainingNotes : [""];
    });
  }

  async function handleSaveNotes() {
    const payload = draftNotes
      .map((note) => note.trim())
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

    setDraftNotes([""]);
    handleCloseNotes();
  }

  function handleNotesPageChange(page: number) {
    if (shouldSkipPageChange(page, notesPagination)) {
      return;
    }

    void loadNotes(page);
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <NoteAction ariaLabel="Customer notes" onClick={handleOpenNotes} />
        {isDeletedCustomer ? (
          <RestoreAction
            ariaLabel="Restore customer"
            disabled={isDeletingCustomer}
            onClick={handleDeleteCustomer}
          />
        ) : (
          <DeleteAction
            ariaLabel="Delete customer"
            disabled={isDeletingCustomer}
            onClick={handleDeleteCustomer}
          />
        )}
      </div>

      <CustomerNotesModal
        isOpen={isNotesOpen}
        customerName={customerName}
        isLoading={isLoadingNotes}
        isSaving={isSavingNotes || isLoadingNotes}
        draftNotes={draftNotes}
        pagination={notesPagination}
        savedNotes={savedNotes}
        onAddNote={handleAddNote}
        onChangeNote={handleChangeNote}
        onClose={handleCloseNotes}
        onPageChange={handleNotesPageChange}
        onRemoveNote={handleRemoveNote}
        onSave={handleSaveNotes}
      />
    </>
  );
}
