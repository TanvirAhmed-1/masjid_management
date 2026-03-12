"use client";

import { cn } from "@/src/lib/utils";
import { useGetRecentActivitiesQuery } from "@/src/redux/features/dashboard/dashboardAPI";
import { Activity, ActivityType } from "@/src/types/dashboard.types";
import { Activity as ActivityIcon } from "lucide-react";
import { Skeleton } from "../skeleton";

function relTime(date: string) {
  const diff = (Date.now() - new Date(date).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return Math.floor(diff / 60) + "m ago";
  if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
  return Math.floor(diff / 86400) + "d ago";
}

function fmtAmt(n: number) {
  if (n >= 1_000_000) return "৳" + (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return "৳" + (n / 1_000).toFixed(1) + "K";
  return "৳" + n;
}

const ACTIVITY_META: Record<
  ActivityType,
  { emoji: string; bg: string; amountColor: string }
> = {
  friday_collection: {
    emoji: "🕌",
    bg: "bg-amber-400/10",
    amountColor: "text-emerald-400",
  },
  member_payment: {
    emoji: "💵",
    bg: "bg-emerald-400/10",
    amountColor: "text-emerald-400",
  },
  purchase: { emoji: "🛒", bg: "bg-rose-400/10", amountColor: "text-rose-400" },
  new_member: { emoji: "👤", bg: "bg-blue-400/10", amountColor: "" },
  new_staff: { emoji: "👔", bg: "bg-violet-400/10", amountColor: "" },
};

function ActivityRow({ item, index }: { item: Activity; index: number }) {
  const meta = ACTIVITY_META[item.type] ?? {
    emoji: "📌",
    bg: "bg-slate-400/10",
    amountColor: "",
  };

  return (
    <div
      className="flex items-start gap-3 py-3 border-b border-white/[0.05] last:border-0"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div
        className={cn(
          "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm mt-0.5",
          meta.bg,
        )}
      >
        {meta.emoji}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-slate-200 leading-tight">
          {item.title}
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5 truncate">
          {item.description}
        </p>
        <p className="text-[10px] text-slate-600 mt-1">
          {relTime(item.date)}
          {item.by && <> · {item.by}</>}
        </p>
      </div>

      {item.amount !== undefined && (
        <div
          className={cn(
            "text-xs font-bold whitespace-nowrap",
            meta.amountColor,
          )}
        >
          {item.badge === "expense" ? "- " : "+ "}
          {fmtAmt(item.amount)}
        </div>
      )}
    </div>
  );
}

export function RecentActivities() {
  const { data, isLoading } = useGetRecentActivitiesQuery({ limit: 8 });

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#161b22] p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <ActivityIcon className="h-4 w-4 text-blue-400" />
            Recent Activity
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Latest transactions & events
          </p>
        </div>
        <button className="text-[11px] font-medium text-amber-400 hover:underline">
          View all
        </button>
      </div>

      <div>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-3 py-3 border-b border-white/[0.05]"
            >
              <Skeleton className="h-8 w-8 rounded-full bg-white/5 flex-shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-3 w-28 bg-white/5 mb-1.5" />
                <Skeleton className="h-2.5 w-40 bg-white/5" />
              </div>
            </div>
          ))
        ) : data?.data?.length === 0 ? (
          <p className="text-center py-6 text-xs text-slate-600">
            No recent activity
          </p>
        ) : (
          data?.data?.map((item: any, i: number) => (
            <ActivityRow key={item.id} item={item} index={i} />
          ))
        )}
      </div>
    </div>
  );
}
