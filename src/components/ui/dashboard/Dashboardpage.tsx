"use client";

import { useState } from "react";
import {
  RiMoneyDollarCircleLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiScalesLine,
  RiUserLine,
  RiTeamLine,
  RiCalendarLine,
  RiRefreshLine,
  RiMoonLine,
  RiShoppingBagLine,
  RiBankCardLine,
  RiFilter3Line,
} from "react-icons/ri";

import {
  useGetDashboardStatsQuery,
  useGetFilteredCollectionsQuery,
  useGetFilteredExpensesQuery,
} from "@/src/redux/features/dashboard/dashboardAPI";
import {
  FridayRecord,
  MemberPayRecord,
  PurchaseRecord,
  SalaryPayRecord,
  TarabiRecord,
  useDashboardFilter,
} from "./Usedashboardfilter";

// ─── tiny helpers ───────────────────────────────────────────────────────────
const tk = (n: number) => "৳" + Math.round(n).toLocaleString("en-BD");
const fdt = (s: string) =>
  new Date(s).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

type TabKey = "friday" | "member" | "salary" | "purchase" | "tarabi";

const TABS: {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
  side: "income" | "expense";
}[] = [
  {
    key: "friday",
    label: "Friday",
    icon: <RiMoneyDollarCircleLine />,
    side: "income",
  },
  { key: "member", label: "Members", icon: <RiUserLine />, side: "income" },
  { key: "salary", label: "Salary", icon: <RiTeamLine />, side: "expense" },
  {
    key: "purchase",
    label: "Purchases",
    icon: <RiShoppingBagLine />,
    side: "expense",
  },
  { key: "tarabi", label: "Tarabi", icon: <RiMoonLine />, side: "expense" },
];

const YEARS = [2023, 2024, 2025, 2026];

// ─── filter bar ─────────────────────────────────────────────────────────────
function FilterBar({
  mode,
  setMode,
  date,
  setDate,
  month,
  setMonth,
  year,
  setYear,
  reset,
  MONTHS,
}: ReturnType<typeof useDashboardFilter>) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-sm">
      <RiFilter3Line className="text-slate-400" size={18} />

      {/* mode selector */}
      <div className="flex rounded-xl border border-slate-200 overflow-hidden text-sm">
        {(["date", "month", "year"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3.5 py-1.5 capitalize transition-colors ${
              mode === m
                ? "bg-emerald-600 text-white"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="h-5 w-px bg-slate-200" />

      {/* date picker */}
      {mode === "date" && (
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      )}

      {/* month + year */}
      {mode === "month" && (
        <div className="flex items-center gap-2">
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {MONTHS.slice(1).map((m: any, i: number) => (
              <option key={i + 1} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* year only */}
      {mode === "year" && (
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      )}

      <button
        onClick={reset}
        className="ml-auto flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-50 transition-colors"
      >
        <RiRefreshLine size={14} /> Reset
      </button>
    </div>
  );
}

// ─── summary cards ───────────────────────────────────────────────────────────
function FinanceCards({
  stats,
}: {
  stats: NonNullable<
    ReturnType<typeof useGetDashboardStatsQuery>["data"]
  >["data"];
}) {
  const ov = stats.overview;
  const isProfit = ov.isProfit;

  const cards = [
    {
      label: "Total revenue",
      value: tk(ov.totalIncome),
      sub: `Friday ${tk(stats.collections.friday.total)} + Members ${tk(stats.collections.member.total)}`,
      icon: <RiArrowUpLine size={18} />,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      bar: "bg-emerald-500",
    },
    {
      label: "Total expense",
      value: tk(ov.totalExpense),
      sub: `Salary ${tk(stats.expenses.salary)} + Purchases ${tk(stats.expenses.purchase)}`,
      icon: <RiArrowDownLine size={18} />,
      color: "text-rose-700",
      bg: "bg-rose-50",
      border: "border-rose-200",
      bar: "bg-rose-500",
    },
    {
      label: isProfit ? "Net surplus" : "Net deficit",
      value: tk(Math.abs(ov.netBalance)),
      sub: isProfit ? "Profit this period" : "Loss this period",
      icon: <RiScalesLine size={18} />,
      color: isProfit ? "text-sky-700" : "text-amber-700",
      bg: isProfit ? "bg-sky-50" : "bg-amber-50",
      border: isProfit ? "border-sky-200" : "border-amber-200",
      bar: isProfit ? "bg-sky-500" : "bg-amber-500",
    },
    {
      label: "Members",
      value: String(stats.members.total),
      sub: `${stats.members.unpaidThisPeriod} unpaid this period`,
      icon: <RiUserLine size={18} />,
      color: "text-violet-700",
      bg: "bg-violet-50",
      border: "border-violet-200",
      bar: "bg-violet-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`relative overflow-hidden rounded-2xl border ${c.border} ${c.bg} p-5`}
        >
          <div
            className={`mb-3 inline-flex rounded-xl p-2 ${c.bg} ${c.color} border ${c.border}`}
          >
            {c.icon}
          </div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            {c.label}
          </p>
          <p className={`mt-1 text-2xl font-semibold ${c.color}`}>{c.value}</p>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">{c.sub}</p>
          <div
            className={`absolute bottom-0 left-0 h-1 w-2/3 ${c.bar} opacity-40 rounded-tr`}
          />
        </div>
      ))}
    </div>
  );
}

// ─── breakdown cards ─────────────────────────────────────────────────────────
function BreakdownCards({
  stats,
}: {
  stats: NonNullable<
    ReturnType<typeof useGetDashboardStatsQuery>["data"]
  >["data"];
}) {
  const rev = stats.overview.totalIncome || 1;
  const exp = stats.overview.totalExpense || 1;

  const revenueRows = [
    {
      label: "Friday collections",
      value: stats.collections.friday.total,
      pct: stats.collections.friday.total / rev,
    },
    {
      label: "Member payments",
      value: stats.collections.member.total,
      pct: stats.collections.member.total / rev,
    },
  ];
  const expenseRows = [
    {
      label: "Staff salaries",
      value: stats.expenses.salary,
      pct: stats.expenses.salary / exp,
    },
    {
      label: "Purchases",
      value: stats.expenses.purchase,
      pct: stats.expenses.purchase / exp,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Revenue */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <h3 className="text-sm font-medium text-slate-700">
            Revenue breakdown
          </h3>
        </div>
        {revenueRows.map((r) => (
          <div key={r.label} className="mb-3 last:mb-0">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">{r.label}</span>
              <span className="font-medium text-slate-800">{tk(r.value)}</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all"
                style={{ width: `${Math.round(r.pct * 100)}%` }}
              />
            </div>
          </div>
        ))}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
          <span className="text-slate-500">Total</span>
          <span className="font-semibold text-emerald-700">
            {tk(stats.overview.totalIncome)}
          </span>
        </div>
      </div>

      {/* Expense */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          <h3 className="text-sm font-medium text-slate-700">
            Expense breakdown
          </h3>
        </div>
        {expenseRows.map((r) => (
          <div key={r.label} className="mb-3 last:mb-0">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">{r.label}</span>
              <span className="font-medium text-slate-800">{tk(r.value)}</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-rose-400 transition-all"
                style={{ width: `${Math.round(r.pct * 100)}%` }}
              />
            </div>
          </div>
        ))}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
          <span className="text-slate-500">Total</span>
          <span className="font-semibold text-rose-700">
            {tk(stats.overview.totalExpense)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── tables ──────────────────────────────────────────────────────────────────
function FridayTable({ rows }: { rows: FridayRecord[] }) {
  if (!rows.length) return <Empty />;
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
          <th className="pb-3 pr-4">#</th>
          <th className="pb-3 pr-4">Date</th>
          <th className="pb-3 pr-4">Recorded by</th>
          <th className="pb-3 text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr
            key={r.id}
            className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
          >
            <td className="py-3 pr-4 text-slate-400">{i + 1}</td>
            <td className="py-3 pr-4 text-slate-600">
              {fdt(r.collectionDate)}
            </td>
            <td className="py-3 pr-4 text-slate-700">{r.user?.name ?? "—"}</td>
            <td className="py-3 text-right font-medium text-emerald-700">
              {tk(r.amount)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MemberTable({ rows }: { rows: MemberPayRecord[] }) {
  if (!rows.length) return <Empty />;
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
          <th className="pb-3 pr-4">#</th>
          <th className="pb-3 pr-4">Member</th>
          <th className="pb-3 pr-4">Month</th>
          <th className="pb-3 pr-4">Paid date</th>
          <th className="pb-3 text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr
            key={r.id}
            className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
          >
            <td className="py-3 pr-4 text-slate-400">{i + 1}</td>
            <td className="py-3 pr-4 text-slate-700">
              {r.member?.name ?? "—"}
            </td>
            <td className="py-3 pr-4 text-slate-500">{r.monthKey}</td>
            <td className="py-3 pr-4 text-slate-500">{fdt(r.paidDate)}</td>
            <td className="py-3 text-right font-medium text-emerald-700">
              {tk(r.amount)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SalaryTable({ rows }: { rows: SalaryPayRecord[] }) {
  if (!rows.length) return <Empty />;
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
          <th className="pb-3 pr-4">#</th>
          <th className="pb-3 pr-4">Staff</th>
          <th className="pb-3 pr-4">Role</th>
          <th className="pb-3 pr-4">Pay date</th>
          <th className="pb-3 text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr
            key={r.id}
            className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
          >
            <td className="py-3 pr-4 text-slate-400">{i + 1}</td>
            <td className="py-3 pr-4 text-slate-700">{r.salary.staff.name}</td>
            <td className="py-3 pr-4">
              <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700">
                {r.salary.staff.role}
              </span>
            </td>
            <td className="py-3 pr-4 text-slate-500">{fdt(r.payDate)}</td>
            <td className="py-3 text-right font-medium text-rose-700">
              {tk(r.amount)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PurchaseTable({ rows }: { rows: PurchaseRecord[] }) {
  if (!rows.length) return <Empty />;
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
          <th className="pb-3 pr-4">#</th>
          <th className="pb-3 pr-4">Item</th>
          <th className="pb-3 pr-4">Qty</th>
          <th className="pb-3 pr-4">Date</th>
          <th className="pb-3 pr-4">By</th>
          <th className="pb-3 text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr
            key={r.id}
            className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
          >
            <td className="py-3 pr-4 text-slate-400">{i + 1}</td>
            <td className="py-3 pr-4 text-slate-700">{r.itemName}</td>
            <td className="py-3 pr-4 text-slate-500">{r.quantity}</td>
            <td className="py-3 pr-4 text-slate-500">{fdt(r.purchaseDate)}</td>
            <td className="py-3 pr-4 text-slate-500">{r.user?.name ?? "—"}</td>
            <td className="py-3 text-right font-medium text-rose-700">
              {tk(r.totalPrice)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TarabiTable({ rows }: { rows: TarabiRecord[] }) {
  if (!rows.length) return <Empty />;
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-slate-100 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
          <th className="pb-3 pr-4">#</th>
          <th className="pb-3 pr-4">Member</th>
          <th className="pb-3 pr-4">Ramadan year</th>
          <th className="pb-3 pr-4">Pay date</th>
          <th className="pb-3 pr-4 text-right">Total</th>
          <th className="pb-3 pr-4 text-right">Paid</th>
          <th className="pb-3 text-right">Due</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => {
          const due = Math.max(0, r.amount - r.paidAmount);
          return (
            <tr
              key={r.id}
              className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
            >
              <td className="py-3 pr-4 text-slate-400">{i + 1}</td>
              <td className="py-3 pr-4 text-slate-700">{r.member.name}</td>
              <td className="py-3 pr-4 text-slate-500">
                {r.ramadanYear.ramadanYear}
              </td>
              <td className="py-3 pr-4 text-slate-500">{fdt(r.payDate)}</td>
              <td className="py-3 pr-4 text-right font-medium text-slate-700">
                {tk(r.amount)}
              </td>
              <td className="py-3 pr-4 text-right font-medium text-emerald-700">
                {tk(r.paidAmount)}
              </td>
              <td
                className={`py-3 text-right font-medium ${due > 0 ? "text-rose-600" : "text-emerald-600"}`}
              >
                {tk(due)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Empty() {
  return (
    <div className="py-12 text-center">
      <RiBankCardLine className="mx-auto mb-3 text-slate-200" size={40} />
      <p className="text-sm text-slate-400">No records for this period</p>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3 py-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-10 animate-pulse rounded-lg bg-slate-100" />
      ))}
    </div>
  );
}

// ─── main page ───────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const f = useDashboardFilter();
  const [activeTab, setActiveTab] = useState<TabKey>("friday");

  const isIncomeTab = TABS.find((t) => t.key === activeTab)?.side === "income";
  const collType =
    activeTab === "friday"
      ? "friday"
      : activeTab === "member"
        ? "member"
        : undefined;
  const expType =
    activeTab === "salary"
      ? "salary"
      : activeTab === "purchase"
        ? "purchase"
        : activeTab === "tarabi"
          ? "tarabi"
          : undefined;

  const {
    data: statsData,
    isFetching: statsFetching,
    isLoading: statsLoading,
  } = useGetDashboardStatsQuery(f.filter);

  const {
    data: colData,
    isFetching: colFetching,
    isLoading: colLoading,
  } = useGetFilteredCollectionsQuery(
    { ...f.filter, type: collType },
    { skip: !collType },
  );
  const {
    data: expData,
    isFetching: expFetching,
    isLoading: expLoading,
  } = useGetFilteredExpensesQuery(
    { ...f.filter, type: expType },
    { skip: !expType },
  );
  if (statsLoading || colLoading || expLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-6">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="space-y-2 w-full">
              <div className="h-7 w-48 animate-pulse rounded-lg bg-slate-200" />
              <div className="h-4 w-32 animate-pulse rounded-lg bg-slate-200/80" />
            </div>
            <div className="h-8 w-32 animate-pulse rounded-full bg-slate-200" />
          </div>

          {/* Filter Bar Skeleton */}
          <div className="h-14 w-full animate-pulse rounded-2xl bg-white border border-slate-200 shadow-sm" />

          {/* Finance Cards Skeleton */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative h-32 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 h-8 w-8 animate-pulse rounded-xl bg-slate-100" />
                <div className="h-4 w-20 animate-pulse rounded bg-slate-100" />
                <div className="mt-2 h-7 w-24 animate-pulse rounded bg-slate-200" />
                {/* Bottom accent line skeleton */}
                <div className="absolute bottom-0 left-0 h-1 w-2/3 animate-pulse bg-emerald-100 rounded-tr" />
              </div>
            ))}
          </div>

          {/* Breakdown & Table Section Skeleton */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-white shadow-sm" />
            <div className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-white shadow-sm" />
          </div>

          {/* Bottom Large Table Skeleton */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="h-14 w-full border-b border-slate-100 bg-slate-50/50 animate-pulse" />
            <div className="p-6 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 flex-1 animate-pulse rounded-lg bg-slate-100" />
                  <div className="h-10 flex-1 animate-pulse rounded-lg bg-slate-100" />
                  <div className="h-10 w-24 animate-pulse rounded-lg bg-slate-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Floating Spinner (Optional) */}
          <div className="fixed bottom-10 right-10 flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-xl border border-slate-200">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            <span className="text-sm font-medium text-slate-600">
              Syncing data...
            </span>
          </div>
        </div>
      </div>
    );
  }
  const stats = statsData?.data;
  const isLoading = statsFetching;
  const tableLoading = colFetching || expFetching;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-5">
        {/* header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
            {stats && (
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-400">
                <RiCalendarLine size={14} />
                {f.label}
              </p>
            )}
          </div>
          {stats?.overview.incomeGrowthPercent !== undefined && (
            <div
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                stats.overview.incomeGrowthPercent >= 0
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {stats.overview.incomeGrowthPercent >= 0 ? (
                <RiArrowUpLine size={13} />
              ) : (
                <RiArrowDownLine size={13} />
              )}
              {Math.abs(stats.overview.incomeGrowthPercent)}% vs last month
            </div>
          )}
        </div>

        {/* filter bar */}
        <FilterBar {...f} />

        {/* finance cards */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        ) : stats ? (
          <FinanceCards stats={stats} />
        ) : null}

        {/* breakdown */}
        {stats && <BreakdownCards stats={stats} />}

        {/* tabs + table */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* tab header */}
          <div className="flex items-center gap-1 border-b border-slate-100 px-5 pt-4 pb-0 flex-wrap">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 rounded-t-xl px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === t.key
                    ? t.side === "income"
                      ? "border-emerald-500 text-emerald-700 bg-emerald-50"
                      : "border-rose-500 text-rose-700 bg-rose-50"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {t.icon}
                {t.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs ${
                    t.side === "income"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {t.side === "income" ? "income" : "expense"}
                </span>
              </button>
            ))}
          </div>

          {/* table */}
          <div className="overflow-x-auto p-5">
            {tableLoading ? (
              <Skeleton />
            ) : (
              <>
                {activeTab === "friday" && (
                  <FridayTable rows={colData?.data?.friday ?? []} />
                )}
                {activeTab === "member" && (
                  <MemberTable rows={colData?.data?.member ?? []} />
                )}
                {activeTab === "salary" && (
                  <SalaryTable rows={expData?.data?.salary ?? []} />
                )}
                {activeTab === "purchase" && (
                  <PurchaseTable rows={expData?.data?.purchase ?? []} />
                )}
                {activeTab === "tarabi" && (
                  <TarabiTable rows={expData?.data?.tarabi ?? []} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
