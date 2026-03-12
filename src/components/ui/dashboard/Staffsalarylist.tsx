"use client";

import { cn } from "@/src/lib/utils";
import { useGetStaffSalaryOverviewQuery } from "@/src/redux/features/dashboard/dashboardAPI";
import { SalaryStatus, StaffSalaryDetail } from "@/src/types/dashboard.types";
import { Briefcase } from "lucide-react";
import { Skeleton } from "../skeleton";


function fmtAmt(n: number) {
  if (n >= 1_000) return "৳" + (n / 1_000).toFixed(0) + "K";
  return "৳" + n;
}

const STATUS_STYLE: Record<SalaryStatus, { pill: string; bar: string }> = {
  PAID: { pill: "bg-emerald-400/10 text-emerald-400", bar: "bg-emerald-400" },
  PARTIAL: { pill: "bg-amber-400/10 text-amber-400", bar: "bg-amber-400" },
  UNPAID: { pill: "bg-rose-400/10 text-rose-400", bar: "bg-rose-500" },
};

const AVATAR_COLORS = [
  "bg-amber-400/20 text-amber-400",
  "bg-blue-400/20 text-blue-400",
  "bg-violet-400/20 text-violet-400",
  "bg-teal-400/20 text-teal-400",
  "bg-rose-400/20 text-rose-400",
];

function StaffRow({ staff }: { staff: StaffSalaryDetail }) {
  const pct =
    staff.thisMonthTotal > 0
      ? Math.min((staff.paid / staff.thisMonthTotal) * 100, 100)
      : 0;
  const s = STATUS_STYLE[staff.status];
  const avatarCls =
    AVATAR_COLORS[(staff.name.charCodeAt(0) || 0) % AVATAR_COLORS.length];

  return (
    <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] px-3 py-2.5 hover:bg-white/[0.06] transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <div
          className={cn(
            "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold uppercase",
            avatarCls,
          )}
        >
          {staff.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-200 truncate">
            {staff.name}
          </p>
          <p className="text-[10px] text-slate-500">{staff.role}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs font-bold text-slate-200">
            {fmtAmt(staff.paid)}
          </p>
          <span
            className={cn(
              "inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
              s.pill,
            )}
          >
            {staff.status}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            s.bar,
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[9px] text-slate-600">
          {fmtAmt(staff.paid)} paid
        </span>
        <span className="text-[9px] text-slate-600">
          {fmtAmt(staff.thisMonthTotal)} total
        </span>
      </div>
    </div>
  );
}

export function StaffSalaryList() {
  const { data, isLoading } = useGetStaffSalaryOverviewQuery();
  const overview = data?.data;

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#161b22] p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-teal-400" />
            Staff Salary
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Current month status
          </p>
        </div>
        <button className="text-[11px] font-medium text-amber-400 hover:underline">
          Manage
        </button>
      </div>

      <div className="space-y-2 flex-1">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg bg-white/5" />
            ))
          : overview?.staff
              .slice(0, 5)
              .map((s) => <StaffRow key={s.id} staff={s} />)}
      </div>

      {overview && (
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-4">
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] px-3 py-2 text-center">
            <p className="text-xs font-bold text-emerald-400">
              {fmtAmt(overview.totalPaid)}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">Paid</p>
          </div>
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] px-3 py-2 text-center">
            <p className="text-xs font-bold text-rose-400">
              {fmtAmt(overview.totalDue)}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">Remaining</p>
          </div>
        </div>
      )}
    </div>
  );
}
