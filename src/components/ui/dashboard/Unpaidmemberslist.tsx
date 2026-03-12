"use client";

import { useGetMemberPaymentStatusQuery } from "@/src/redux/features/dashboard/dashboardAPI";
import { UnpaidMember } from "@/src/types/dashboard.types";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Skeleton } from "../skeleton";

const AVATAR_COLORS = [
  "bg-amber-500/20 text-amber-400",
  "bg-emerald-500/20 text-emerald-400",
  "bg-blue-500/20 text-blue-400",
  "bg-violet-500/20 text-violet-400",
  "bg-rose-500/20 text-rose-400",
  "bg-teal-500/20 text-teal-400",
];

function getAvatarColor(name: string) {
  return AVATAR_COLORS[(name.charCodeAt(0) || 0) % AVATAR_COLORS.length];
}

function MemberRow({ member }: { member: UnpaidMember }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white/[0.03] border border-white/[0.05] px-3 py-2.5 transition-colors hover:bg-white/[0.06]">
      <div
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold uppercase ${getAvatarColor(member.name)}`}
      >
        {member.name[0]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-200 truncate">
          {member.name}
        </p>
        <p className="text-[10px] text-slate-500">
          {member.phone ?? "No phone"}
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-xs font-bold text-amber-400">
          ৳{member.monthlyAmount.toLocaleString()}
        </p>
        <span className="inline-block rounded-full bg-rose-400/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-rose-400">
          Due
        </span>
      </div>
    </div>
  );
}

export function UnpaidMembersList() {
  const { data, isLoading } = useGetMemberPaymentStatusQuery({});
  const unpaid = data?.data?.unpaid ?? [];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#161b22] p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-rose-400" />
            Due Payments
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Members yet to pay this month
          </p>
        </div>
        {!isLoading && (
          <span className="rounded-full bg-rose-400/10 px-2.5 py-1 text-[11px] font-semibold text-rose-400">
            {unpaid.length}
          </span>
        )}
      </div>

      <div className="space-y-2 flex-1">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg bg-white/5" />
          ))
        ) : unpaid.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle2 className="h-10 w-10 text-emerald-400/40 mb-2" />
            <p className="text-xs font-semibold text-emerald-400">
              All caught up!
            </p>
            <p className="text-[11px] text-slate-600 mt-1">
              All members have paid this month
            </p>
          </div>
        ) : (
          unpaid.slice(0, 6).map((m) => <MemberRow key={m.id} member={m} />)
        )}
      </div>

      {unpaid.length > 6 && (
        <button className="mt-3 w-full rounded-lg border border-white/[0.06] py-2 text-[11px] font-medium text-slate-500 hover:text-slate-300 hover:border-white/10 transition-colors">
          View {unpaid.length - 6} more
        </button>
      )}
    </div>
  );
}
