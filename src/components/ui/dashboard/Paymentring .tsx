"use client";

import { useGetMemberPaymentStatusQuery } from "@/src/redux/features/dashboard/dashboardAPI";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Badge } from "@/src/components/ui/badge";
import { Users } from "lucide-react";
import { cn } from "@/src/lib/utils";

function fmtAmt(n: number) {
  if (n >= 1_000_000) return "৳" + (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return "৳" + (n / 1_000).toFixed(0) + "K";
  return "৳" + n;
}

const CIRCUMFERENCE = 2 * Math.PI * 45; // r=45

export function PaymentRing() {
  const { data, isLoading } = useGetMemberPaymentStatusQuery({});

  if (isLoading) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-[#161b22] p-5">
        <Skeleton className="h-5 w-36 mb-1 bg-white/5" />
        <Skeleton className="h-3 w-28 mb-6 bg-white/5" />
        <Skeleton className="h-36 w-36 mx-auto rounded-full bg-white/5 mb-6" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-full bg-white/5 rounded-lg" />
          <Skeleton className="h-8 w-full bg-white/5 rounded-lg" />
          <Skeleton className="h-8 w-full bg-white/5 rounded-lg" />
        </div>
      </div>
    );
  }

  const summary = data?.data?.summary;
  if (!summary) return null;

  const pct = summary.paymentRate;
  const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;

  const rows = [
    {
      label: "Expected",
      value: fmtAmt(summary.expectedAmount),
      color: "text-amber-400",
    },
    {
      label: "Collected",
      value: fmtAmt(summary.collectedAmount),
      color: "text-emerald-400",
    },
    {
      label: "Pending",
      value: fmtAmt(summary.pendingAmount),
      color: "text-rose-400",
    },
  ];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#161b22] p-5 flex flex-col">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <Users className="h-4 w-4 text-violet-400" />
          Member Payments
        </h3>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Current month — {data?.data?.monthKey}
        </p>
      </div>

      {/* SVG Ring */}
      <div className="flex justify-center mb-5">
        <div className="relative w-36 h-36">
          <svg
            width="144"
            height="144"
            viewBox="0 0 120 120"
            className="-rotate-90"
          >
            {/* Track */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="10"
            />
            {/* Fill */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke={pct >= 80 ? "#34d399" : pct >= 50 ? "#f59e0b" : "#f43f5e"}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              style={{
                transition:
                  "stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
          </svg>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-100">{pct}%</span>
            <span className="text-[10px] text-slate-500 leading-tight text-center">
              paid this
              <br />
              month
            </span>
          </div>
        </div>
      </div>

      {/* Count row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          {
            label: "Paid",
            count: summary.paidCount,
            color: "text-emerald-400",
          },
          {
            label: "Unpaid",
            count: summary.unpaidCount,
            color: "text-rose-400",
          },
          {
            label: "Total",
            count: summary.totalMembers,
            color: "text-slate-300",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center rounded-lg bg-white/[0.03] p-2 border border-white/[0.05]"
          >
            <span className={cn("text-lg font-bold", item.color)}>
              {item.count}
            </span>
            <span className="text-[10px] text-slate-500">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Amount rows */}
      <div className="rounded-lg bg-white/[0.03] border border-white/[0.05] overflow-hidden">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={cn(
              "flex items-center justify-between px-3 py-2.5 text-xs",
              i < rows.length - 1 && "border-b border-white/[0.05]",
            )}
          >
            <span className="text-slate-500">{row.label}</span>
            <span className={cn("font-bold", row.color)}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
