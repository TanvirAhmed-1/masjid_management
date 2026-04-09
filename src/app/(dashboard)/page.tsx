// "use client";
// import React, { useState, useEffect } from "react";
// import { Button } from "@/src/components/ui/button";
// import { MonthlyChart } from "@/src/components/ui/dashboard/Monthlychart";
// import { PaymentRing } from "@/src/components/ui/dashboard/Paymentring ";
// import {
//   StatCard,
//   StatCardSkeleton,
// } from "@/src/components/ui/dashboard/Statcard";
// import { useGetDashboardStatsQuery } from "@/src/redux/features/dashboard/dashboardAPI";
// import {
//   TrendingUp,
//   TrendingDown,
//   Users,
//   Wallet,
//   ShoppingCart,
//   RefreshCw,
// } from "lucide-react";

// function fmt(n: number) {
//   if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
//   if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
//   return n.toLocaleString();
// }

// export default function DashboardPage() {
//   const { data, isLoading, refetch, isFetching } = useGetDashboardStatsQuery();
//   const [mounted, setMounted] = useState(false);

//   // Hydration error সমাধান করার জন্য useEffect ব্যবহার করা হয়েছে
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   const stats = data?.data;

//   return (
//     // Background set to White, Text set to Slate (to avoid pure black)
//     <div className="min-h-screen bg-white font-sans text-slate-900">
//       <main className="px-6 py-8 max-w-[1400px] mx-auto">
//         {/* ── SUMMARY CHIPS ────────────────────────────────── */}
//         {stats && (
//           <div className="flex flex-wrap gap-2 mb-6">
//             {/* Refresh Button - Teal Theme */}
//             <div className="bg-teal-50 p-1 rounded-xl border border-teal-100">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="h-8 w-8 text-teal-600 hover:bg-teal-100 hover:text-teal-800"
//                 onClick={() => refetch()}
//                 disabled={isFetching}
//               >
//                 <RefreshCw
//                   className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
//                 />
//               </Button>
//             </div>

//             {[
//               {
//                 label: "Net Balance",
//                 value: `৳${fmt(Math.abs(stats.overview.netBalance))}`,
//                 color:
//                   stats.overview.netBalance >= 0
//                     ? "text-emerald-600"
//                     : "text-rose-600",
//                 bg:
//                   stats.overview.netBalance >= 0
//                     ? "bg-emerald-50 border-emerald-100"
//                     : "bg-rose-50 border-rose-100",
//               },
//               {
//                 label: "Total Members",
//                 value: String(stats.members.total),
//                 color: "text-teal-600",
//                 bg: "bg-teal-50 border-teal-100",
//               },
//               {
//                 label: "Active Staff",
//                 value: String(stats.staff.active),
//                 color: "text-green-600",
//                 bg: "bg-green-50 border-green-100",
//               },
//               {
//                 label: "Ramadan Donors",
//                 value: String(stats.ramadan.totalDoners),
//                 color: "text-teal-700",
//                 bg: "bg-teal-100/40 border-teal-200",
//               },
//               {
//                 label: "Unpaid This Month",
//                 value: String(stats.members.unpaidThisMonth),
//                 color: "text-rose-600",
//                 bg: "bg-rose-50 border-rose-100",
//               },
//             ].map((chip) => (
//               <div
//                 key={chip.label}
//                 className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs ${chip.bg}`}
//               >
//                 <span className="text-slate-500 font-medium">{chip.label}</span>
//                 <span className={`font-bold ${chip.color}`}>{chip.value}</span>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ── STAT CARDS (ALL TIME) ─────────────────────────── */}
//         <div className="mb-2 flex items-center justify-between">
//           <p className="text-[11px] uppercase tracking-[2px] text-teal-800 font-bold">
//             Key Metrics
//           </p>
//         </div>
//         <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6 mb-8">
//           {isLoading ? (
//             Array.from({ length: 6 }).map((_, i) => (
//               <StatCardSkeleton key={i} />
//             ))
//           ) : stats ? (
//             <>
//               <StatCard
//                 label="Total Income"
//                 value={fmt(stats.overview.totalIncome)}
//                 isCurrency
//                 icon={<TrendingUp className="h-4 w-4" />}
//                 accent="emerald"
//                 change={stats.overview.incomeGrowthPercent}
//                 changeLabel="vs last month"
//                 delay={50}
//               />
//               <StatCard
//                 label="Total Expense"
//                 value={fmt(stats.overview.totalExpense)}
//                 isCurrency
//                 icon={<TrendingDown className="h-4 w-4" />}
//                 accent="crimson"
//                 sub="Salary + Purchases"
//                 delay={100}
//               />
//               <StatCard
//                 label="Net Balance"
//                 value={fmt(Math.abs(stats.overview.netBalance))}
//                 isCurrency
//                 icon={<Wallet className="h-4 w-4" />}
//                 accent={stats.overview.netBalance >= 0 ? "teal" : "crimson"}
//                 sub={stats.overview.netBalance >= 0 ? "Surplus" : "Deficit"}
//                 delay={150}
//               />
//               <StatCard
//                 label="Friday Collections"
//                 value={fmt(stats.collections.friday.total)}
//                 isCurrency
//                 icon={<span className="text-base">🕌</span>}
//                 accent="green"
//                 sub={`${stats.collections.friday.count} entries`}
//                 delay={200}
//               />
//               <StatCard
//                 label="Member Payments"
//                 value={fmt(stats.collections.member.total)}
//                 isCurrency
//                 icon={<Users className="h-4 w-4" />}
//                 accent="teal"
//                 sub={`${stats.collections.member.count} payments`}
//                 delay={250}
//               />
//               <StatCard
//                 label="Purchases"
//                 value={fmt(stats.purchases.totalAmount)}
//                 isCurrency
//                 icon={<ShoppingCart className="h-4 w-4" />}
//                 accent="teal"
//                 sub={`${stats.purchases.totalCount} items`}
//                 delay={300}
//               />
//             </>
//           ) : null}
//         </div>

//         {/* ── THIS MONTH STATS ─────────────────────────────── */}
//         {stats && (
//           <>
//             <div className="mb-2">
//               <p className="text-[11px] uppercase tracking-[2px] text-teal-800 font-bold">
//                 This Month
//               </p>
//             </div>
//             <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6 mb-8">
//               <StatCard
//                 label="Month Income"
//                 value={fmt(stats.overview.currentMonthIncome)}
//                 isCurrency
//                 icon={<TrendingUp className="h-4 w-4" />}
//                 accent="emerald"
//                 delay={50}
//               />
//               <StatCard
//                 label="Month Expense"
//                 value={fmt(stats.overview.currentMonthExpense)}
//                 isCurrency
//                 icon={<TrendingDown className="h-4 w-4" />}
//                 accent="crimson"
//                 delay={100}
//               />
//               <StatCard
//                 label="Month Net"
//                 value={fmt(Math.abs(stats.overview.currentMonthNet))}
//                 isCurrency
//                 icon={<Wallet className="h-4 w-4" />}
//                 accent={
//                   stats.overview.currentMonthNet >= 0 ? "green" : "crimson"
//                 }
//                 sub={
//                   stats.overview.currentMonthNet >= 0 ? "Surplus" : "Deficit"
//                 }
//                 delay={150}
//               />
//               <StatCard
//                 label="Friday (Month)"
//                 value={fmt(stats.collections.friday.thisMonth)}
//                 isCurrency
//                 icon={<span className="text-base">🕌</span>}
//                 accent="teal"
//                 sub={`${stats.collections.friday.thisMonthCount} Fridays`}
//                 delay={200}
//               />
//               <StatCard
//                 label="Members Paid"
//                 value={String(stats.collections.member.thisMonthCount)}
//                 icon={<Users className="h-4 w-4" />}
//                 accent="green"
//                 sub={`৳${fmt(stats.collections.member.thisMonth)} collected`}
//                 delay={250}
//               />
//               <StatCard
//                 label="Staff Salary"
//                 value={fmt(stats.staff.thisMonthSalaryPaid)}
//                 isCurrency
//                 icon={<span className="text-base">💼</span>}
//                 accent="teal"
//                 sub={`${stats.staff.active} active`}
//                 delay={300}
//               />
//             </div>
//           </>
//         )}

//         {/* ── CHART + RING ─────────────────────────────────── */}
//         <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_300px] mb-8">
//           <div className="bg-white rounded-2xl border border-teal-50 shadow-sm overflow-hidden p-1">
//             <MonthlyChart />
//           </div>
//           <div className="bg-white rounded-2xl border border-teal-50 shadow-sm overflow-hidden p-4">
//             <PaymentRing />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import React from 'react';

const page = () => {
  return (
    <div>
      
    </div>
  );
};

export default page;
