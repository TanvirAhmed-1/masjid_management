"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useGetMonthlyChartQuery } from "@/src/redux/features/dashboard/dashboardAPI";
import { Skeleton } from "@/src/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

function fmtK(n: number) {
  if (n >= 1_000_000) return "৳" + (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return "৳" + (n / 1_000).toFixed(1) + "K";
  return "৳" + n;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#1c2230] p-3 shadow-2xl text-xs">
      <p className="font-semibold text-slate-300 mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: p.fill }}
          />
          <span className="text-slate-400">{p.name}:</span>
          <span className="font-bold text-slate-200">{fmtK(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export function MonthlyChart() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { data, isLoading } = useGetMonthlyChartQuery({ year });

  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-[#161b22] p-5">
        <Skeleton className="h-5 w-40 mb-1 bg-white/5" />
        <Skeleton className="h-3 w-28 mb-6 bg-white/5" />
        <Skeleton className="h-52 w-full bg-white/5 rounded-lg" />
      </div>
    );
  }

  const chartData = data?.data?.data ?? [];
  const summary = data?.data?.summary;

  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#161b22] p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-amber-400" />
            Income vs Expense
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Monthly overview — {year}
          </p>
        </div>
        <Select
          value={String(year)}
          onValueChange={(v: any) => setYear(Number(v))}
        >
          <SelectTrigger className="h-8 w-[90px] border-white/10 bg-white/5 text-xs text-slate-300 focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-white/10 bg-[#1c2230] text-slate-300">
            {years.map((y) => (
              <SelectItem
                key={y}
                value={String(y)}
                className="text-xs focus:bg-white/10"
              >
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} barGap={3} barCategoryGap="28%">
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmtK}
            width={52}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Legend
            wrapperStyle={{
              fontSize: "11px",
              color: "#64748b",
              paddingTop: "12px",
            }}
            iconType="square"
            iconSize={8}
          />
          <Bar
            dataKey="totalIncome"
            name="Income"
            fill="#f59e0b"
            radius={[4, 4, 0, 0]}
            maxBarSize={22}
          />
          <Bar
            dataKey="totalExpense"
            name="Expense"
            fill="#f43f5e"
            radius={[4, 4, 0, 0]}
            maxBarSize={22}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Summary pills */}
      {summary && (
        <div className="mt-4 flex gap-3 flex-wrap border-t border-white/[0.06] pt-4">
          <div className="flex items-center gap-1.5 rounded-full bg-amber-400/10 px-3 py-1">
            <span className="text-[10px] text-amber-400/60">Total Income</span>
            <span className="text-[11px] font-bold text-amber-400">
              {fmtK(summary.totalIncome)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-rose-400/10 px-3 py-1">
            <span className="text-[10px] text-rose-400/60">Total Expense</span>
            <span className="text-[11px] font-bold text-rose-400">
              {fmtK(summary.totalExpense)}
            </span>
          </div>
          <div
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 ${summary.netBalance >= 0 ? "bg-emerald-400/10" : "bg-rose-400/10"}`}
          >
            <span
              className={`text-[10px] ${summary.netBalance >= 0 ? "text-emerald-400/60" : "text-rose-400/60"}`}
            >
              Net
            </span>
            <span
              className={`text-[11px] font-bold ${summary.netBalance >= 0 ? "text-emerald-400" : "text-rose-400"}`}
            >
              {fmtK(Math.abs(summary.netBalance))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
