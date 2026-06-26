"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  createBlankExpenseInput,
  EXPENSE_CURRENCY_OPTIONS,
  expenseFieldsEqual,
  formatExpenseAmount,
  getInternalUserById,
  INTERNAL_EXPENSE_USERS,
  type ExpenseCurrency,
  type FinancialExpense,
} from "@/lib/expenses-data";
import { cn } from "@/lib/utils";
import { ArrowLeft, Loader2, Pencil, Plus, Receipt, Save, Trash2 } from "lucide-react";

async function readApiJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) throw new Error(`Request failed (${response.status})`);
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(response.ok ? "Invalid server response." : text.slice(0, 180));
  }
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/45">
      {children}
    </label>
  );
}

function inputClassName() {
  return "mt-1.5 w-full rounded-xl border border-white/10 bg-[#0b1524] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-sky-400/50 disabled:cursor-not-allowed disabled:opacity-60";
}

type ExpensesWorkspaceProps = {
  onBackToFinancials?: () => void;
};

export default function ExpensesWorkspace({ onBackToFinancials }: ExpensesWorkspaceProps) {
  const [expenses, setExpenses] = useState<FinancialExpense[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [newDraft, setNewDraft] = useState<FinancialExpense | null>(null);
  const [savedSnapshot, setSavedSnapshot] = useState<FinancialExpense | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const snapshottedIdRef = useRef<string | null>(null);

  const selected = useMemo(() => {
    if (selectedId === "__draft__" && newDraft) return newDraft;
    return expenses.find((entry) => entry.id === selectedId) ?? null;
  }, [expenses, selectedId, newDraft]);

  const isDirty = useMemo(() => {
    if (!selected || !isEditing) return false;
    if (selected.id === "__draft__") return true;
    if (!savedSnapshot || savedSnapshot.id !== selected.id) return true;
    return !expenseFieldsEqual(selected, savedSnapshot);
  }, [selected, savedSnapshot, isEditing]);

  const loadExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/financials/expenses", { cache: "no-store" });
      const data = await readApiJson<{ expenses?: FinancialExpense[]; error?: string }>(response);
      if (!response.ok) throw new Error(data.error ?? "Failed to load expenses");

      const next = data.expenses ?? [];
      setExpenses(next);
      setSelectedId((current) => {
        if (current === "__draft__") return current;
        if (current && next.some((entry) => entry.id === current)) return current;
        return null;
      });
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load expenses");
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadExpenses();
  }, [loadExpenses]);

  useEffect(() => {
    if (!selectedId || selectedId === "__draft__") {
      snapshottedIdRef.current = null;
      setSavedSnapshot(null);
      return;
    }
    if (snapshottedIdRef.current === selectedId) return;
    const entry = expenses.find((item) => item.id === selectedId);
    if (entry) {
      snapshottedIdRef.current = selectedId;
      setSavedSnapshot({ ...entry });
    }
  }, [selectedId, expenses]);

  async function saveExpense(expense: FinancialExpense, isNew: boolean) {
    setBusy(true);
    setError(null);

    try {
      if (isNew) {
        const response = await fetch("/api/financials/expenses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            submitterUserId: expense.submitterUserId,
            purposeDescription: expense.purposeDescription,
            amount: expense.amount,
            currency: expense.currency,
            dateSubmitted: expense.dateSubmitted,
            paid: expense.paid,
          }),
        });

        const data = await readApiJson<{ expense?: FinancialExpense; error?: string }>(response);
        if (!response.ok || !data.expense) throw new Error(data.error ?? "Failed to save expense");

        setExpenses((current) => [data.expense!, ...current]);
        setNewDraft(null);
        setSelectedId(data.expense.id);
        snapshottedIdRef.current = data.expense.id;
        setSavedSnapshot(data.expense);
        setIsEditing(false);
        setSaveMessage("Expense saved");
        return;
      }

      const response = await fetch(`/api/financials/expenses/${expense.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submitterUserId: expense.submitterUserId,
          purposeDescription: expense.purposeDescription,
          amount: expense.amount,
          currency: expense.currency,
          dateSubmitted: expense.dateSubmitted,
          paid: expense.paid,
        }),
      });

      const data = await readApiJson<{ expense?: FinancialExpense; error?: string }>(response);
      if (!response.ok || !data.expense) throw new Error(data.error ?? "Failed to save expense");

      setExpenses((current) =>
        current.map((entry) => (entry.id === data.expense!.id ? data.expense! : entry)),
      );
      snapshottedIdRef.current = data.expense.id;
      setSavedSnapshot(data.expense);
      setIsEditing(false);
      setSaveMessage("Changes saved");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to save");
    } finally {
      setBusy(false);
    }
  }

  function patchSelected(patch: Partial<FinancialExpense>) {
    if (!selected || !isEditing) return;

    if (patch.submitterUserId) {
      const user = getInternalUserById(patch.submitterUserId);
      patch.submitterName = user?.fullName ?? selected.submitterName;
    }

    if (selected.id === "__draft__" && newDraft) {
      setNewDraft({ ...newDraft, ...patch });
      return;
    }

    const next = { ...selected, ...patch };
    setExpenses((current) => current.map((entry) => (entry.id === next.id ? next : entry)));
  }

  function handleNewExpense() {
    setError(null);
    setSaveMessage(null);
    const blank = createBlankExpenseInput();
    setNewDraft({
      ...blank,
      id: "__draft__",
      createdAt: "",
      updatedAt: "",
    });
    setSelectedId("__draft__");
    setIsEditing(true);
  }

  function handleEditExpense(expense: FinancialExpense) {
    setError(null);
    setSaveMessage(null);
    setNewDraft(null);
    setSelectedId(expense.id);
    setIsEditing(true);
  }

  async function handleSaveExpense() {
    if (!selected) return;
    setError(null);
    setSaveMessage(null);
    await saveExpense(selected, selected.id === "__draft__");
  }

  async function handleDeleteExpense() {
    if (!selected) return;

    if (selected.id === "__draft__") {
      setNewDraft(null);
      setSelectedId(null);
      setIsEditing(false);
      return;
    }

    if (!window.confirm(`Delete expense for "${selected.submitterName}"?`)) return;

    setBusy(true);
    setError(null);

    try {
      const response = await fetch(`/api/financials/expenses/${selected.id}`, { method: "DELETE" });
      const data = await readApiJson<{ error?: string }>(response);
      if (!response.ok) throw new Error(data.error ?? "Failed to delete expense");

      const remaining = expenses.filter((entry) => entry.id !== selected.id);
      setExpenses(remaining);
      setSelectedId(null);
      setIsEditing(false);
      setSavedSnapshot(null);
      snapshottedIdRef.current = null;
      setSaveMessage("Expense deleted");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete expense");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            {onBackToFinancials && (
              <button
                type="button"
                onClick={onBackToFinancials}
                className="mt-0.5 inline-flex h-9 items-center gap-1.5 rounded-xl border border-white/10 px-3 text-xs text-white/60 transition-colors hover:border-white/20 hover:text-white"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Financials
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Expenses</h3>
              </div>
              <p className="mt-1 text-xs text-white/45">
                {expenses.length} submitted expenses · track purpose, amount, and payment status
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={handleNewExpense}
            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-3 text-xs font-semibold text-emerald-200 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/25 disabled:opacity-50"
          >
            <Plus className="h-3.5 w-3.5" />
            New expense
          </button>
        </div>
      </section>

      {saveMessage && (
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {saveMessage}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
          {error.includes("financial_expenses") && (
            <p className="mt-1 text-xs text-red-200/70">
              Run{" "}
              <span className="font-mono">supabase/migrations/018_create_financial_expenses.sql</span>{" "}
              in Supabase SQL Editor.
            </p>
          )}
        </div>
      )}

      <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6">
        <h3 className="text-sm font-semibold text-white">Expense log</h3>

        {loading ? (
          <div className="mt-6 flex items-center gap-3 text-sm text-white/55">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading expenses…
          </div>
        ) : expenses.length === 0 ? (
          <p className="mt-6 text-sm text-white/45">
            No expenses yet. Click New expense to submit the first entry.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] text-[9px] font-medium uppercase tracking-[0.12em] text-white/35">
                  <th className="px-3 py-2.5 font-medium">Name</th>
                  <th className="px-3 py-2.5 font-medium">Purpose</th>
                  <th className="px-3 py-2.5 font-medium">Amount</th>
                  <th className="px-3 py-2.5 font-medium">Submitted</th>
                  <th className="px-3 py-2.5 font-medium">Paid</th>
                  <th className="px-3 py-2.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => {
                  const active = expense.id === selectedId && selectedId !== "__draft__";
                  return (
                    <tr
                      key={expense.id}
                      className={cn(
                        "border-b border-white/[0.05] last:border-0",
                        active && "bg-emerald-500/5",
                      )}
                    >
                      <td className="px-3 py-2.5 font-medium text-white/90">
                        {expense.submitterName}
                      </td>
                      <td className="max-w-[220px] truncate px-3 py-2.5 text-white/65">
                        {expense.purposeDescription}
                      </td>
                      <td className="px-3 py-2.5 font-mono text-white/80">
                        {formatExpenseAmount(expense.amount, expense.currency)}
                      </td>
                      <td className="px-3 py-2.5 text-white/55">{expense.dateSubmitted}</td>
                      <td className="px-3 py-2.5">
                        <span
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em]",
                            expense.paid
                              ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-300"
                              : "border-amber-400/40 bg-amber-500/15 text-amber-200",
                          )}
                        >
                          {expense.paid ? "Paid" : "Unpaid"}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => handleEditExpense(expense)}
                          className="inline-flex h-8 items-center gap-1 rounded-lg border border-white/10 px-2.5 text-xs text-white/70 transition-colors hover:border-white/20 hover:text-white disabled:opacity-50"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selected && isEditing ? (
        <section className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#60a5fa]">
                {selected.id === "__draft__" ? "New expense" : "Edit expense"}
              </p>
              <h2 className="mt-1 text-lg font-semibold text-white">
                {selected.submitterName || "Expense entry"}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={busy || !isDirty}
                onClick={() => void handleSaveExpense()}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-3 text-xs font-semibold text-emerald-200 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" />
                Save
              </button>
              {selected.id !== "__draft__" && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void handleDeleteExpense()}
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-red-400/20 px-3 text-xs text-red-300 hover:bg-red-500/10 disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              )}
              {selected.id === "__draft__" && (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void handleDeleteExpense()}
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-white/10 px-3 text-xs text-white/55 hover:bg-white/[0.04] disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Name (internal user)</FieldLabel>
              <select
                className={inputClassName()}
                value={selected.submitterUserId}
                onChange={(event) => patchSelected({ submitterUserId: event.target.value })}
                disabled={busy}
              >
                {INTERNAL_EXPENSE_USERS.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel>Date submitted</FieldLabel>
              <input
                type="date"
                className={inputClassName()}
                value={selected.dateSubmitted}
                onChange={(event) => patchSelected({ dateSubmitted: event.target.value })}
                disabled={busy}
              />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Purpose description</FieldLabel>
              <textarea
                rows={3}
                className={cn(inputClassName(), "resize-y")}
                value={selected.purposeDescription}
                onChange={(event) => patchSelected({ purposeDescription: event.target.value })}
                disabled={busy}
                placeholder="Describe the business purpose for this expense…"
              />
            </div>
            <div>
              <FieldLabel>Amount</FieldLabel>
              <input
                type="number"
                min={0}
                step={0.01}
                className={inputClassName()}
                value={selected.amount}
                onChange={(event) =>
                  patchSelected({ amount: Number(event.target.value) || 0 })
                }
                disabled={busy}
              />
            </div>
            <div>
              <FieldLabel>Currency</FieldLabel>
              <select
                className={inputClassName()}
                value={selected.currency}
                onChange={(event) =>
                  patchSelected({ currency: event.target.value as ExpenseCurrency })
                }
                disabled={busy}
              >
                {EXPENSE_CURRENCY_OPTIONS.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Paid?</FieldLabel>
              <label className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b1524] px-3 py-2.5">
                <input
                  type="checkbox"
                  checked={selected.paid}
                  onChange={(event) => patchSelected({ paid: event.target.checked })}
                  disabled={busy}
                  className="h-4 w-4 rounded border-white/20 bg-transparent accent-emerald-500"
                />
                <span className="text-sm text-white/75">
                  {selected.paid ? "Marked as paid" : "Not yet paid"}
                </span>
              </label>
            </div>
          </div>
        </section>
      ) : (
        !loading && (
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-white/45">
            Select Edit on an expense or create a new one to update details.
          </section>
        )
      )}
    </div>
  );
}
