"use client";

import { cn } from "@/src/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  isCurrency?: boolean;
  icon: React.ReactNode;
  change?: number;
  changeLabel?: string;
  sub?: string;
  // added "green" to types
  accent: "gold" | "emerald" | "crimson" | "blue" | "purple" | "teal" | "green";
  delay?: number;
}

const ACCENT = {
  gold: {
    bar: "bg-amber-400",
    icon: "bg-amber-50 text-amber-600",
    badge: "bg-amber-50 text-amber-600",
  },
  emerald: {
    bar: "bg-emerald-500",
    icon: "bg-emerald-50 text-emerald-600",
    badge: "bg-emerald-50 text-emerald-600",
  },
  green: {
    bar: "bg-green-500",
    icon: "bg-green-50 text-green-600",
    badge: "bg-green-50 text-green-600",
  },
  crimson: {
    bar: "bg-rose-500",
    icon: "bg-rose-50 text-rose-600",
    badge: "bg-rose-50 text-rose-600",
  },
  blue: {
    bar: "bg-blue-500",
    icon: "bg-blue-50 text-blue-600",
    badge: "bg-blue-50 text-blue-600",
  },
  purple: {
    bar: "bg-violet-500",
    icon: "bg-violet-50 text-violet-600",
    badge: "bg-violet-50 text-violet-600",
  },
  teal: {
    bar: "bg-teal-500",
    icon: "bg-teal-50 text-teal-600",
    badge: "bg-teal-50 text-teal-600",
  },
};

export function StatCard({
  label,
  value,
  isCurrency = false,
  icon,
  change,
  changeLabel,
  sub,
  accent,
  delay = 0,
}: StatCardProps) {
  // Safe access for the accent color
  const a = ACCENT[accent] || ACCENT.teal;
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* top accent bar */}
      <div className={cn("absolute inset-x-0 top-0 h-[3px]", a.bar)} />

      <div className="flex items-start justify-between mb-4">
        <p className="text-[11px] font-bold uppercase tracking-[1.4px] text-slate-400">
          {label}
        </p>
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg text-base shadow-sm",
            a.icon,
          )}
        >
          {icon}
        </div>
      </div>

      <div className="mb-2">
        <span className="text-2xl font-bold tracking-tight text-slate-800">
          {isCurrency && (
            <span className="text-sm font-medium text-slate-400 mr-0.5">৳</span>
          )}
          {typeof value === "number" ? value.toLocaleString("en-US") : value}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {change !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
              isPositive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-rose-50 text-rose-600",
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(change)}%
          </span>
        )}
        {(changeLabel || sub) && (
          <span className="text-[11px] font-medium text-slate-400">
            {changeLabel || sub}
          </span>
        )}
      </div>
    </div>
  );
}

// Skeleton version
export function StatCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-100 bg-white p-5">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-slate-100" />
      <div className="flex items-start justify-between mb-4">
        <div className="h-3 w-24 rounded-full bg-slate-100 animate-pulse" />
        <div className="h-9 w-9 rounded-lg bg-slate-100 animate-pulse" />
      </div>
      <div className="h-7 w-32 rounded bg-slate-100 animate-pulse mb-3" />
      <div className="h-3 w-20 rounded-full bg-slate-100 animate-pulse" />
    </div>
  );
}
