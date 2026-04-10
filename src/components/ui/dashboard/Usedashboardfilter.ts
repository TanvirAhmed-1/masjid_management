// ─── shared ────────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type FilterMode = "date" | "month" | "year";

export interface DashboardFilter {
  mode: FilterMode;
  date?: string; // "YYYY-MM-DD"
  month?: number; // 1-12
  year?: number;
}

// ─── stats ─────────────────────────────────────────────────────────────────
export interface DashboardStats {
  filter: DashboardFilter;
  overview: {
    totalIncome: number;
    totalExpense: number;
    netBalance: number;
    isProfit: boolean;
    incomeGrowthPercent: number;
  };
  collections: {
    friday: { total: number; count: number };
    member: { total: number; count: number };
    other: { count: number };
  };
  expenses: {
    salary: number;
    purchase: number;
    total: number;
  };
  members: {
    total: number;
    unpaidThisPeriod: number;
    upcomingDues: UpcomingDue[];
  };
  staff: { total: number; active: number };
  ramadan: { totalDoners: number };
}

export interface UpcomingDue {
  id: string;
  name: string;
  phone: string | null;
  monthlyAmount: number;
}

// ─── collections ───────────────────────────────────────────────────────────
export interface FridayRecord {
  id: string;
  amount: number;
  collectionDate: string;
  createdAt: string;
  user: { name: string } | null;
}

export interface MemberPayRecord {
  id: string;
  amount: number;
  paidDate: string;
  monthKey: string;
  member: { name: string; phone: string | null } | null;
  user: { name: string } | null;
}

export interface OtherCollRecord {
  id: string;
  date: string | null;
  createdAt: string;
  otherCollectionName: { title: string };
  donors: { id: string; name: string; amount: number }[];
  user: { name: string } | null;
}

export interface FilteredCollections {
  friday?: FridayRecord[];
  member?: MemberPayRecord[];
  other?: OtherCollRecord[];
}

// ─── expenses ──────────────────────────────────────────────────────────────
export interface SalaryPayRecord {
  id: string;
  amount: number;
  payDate: string;
  salary: {
    totalSalary: number;
    staff: { name: string; role: string };
  };
}

export interface PurchaseRecord {
  id: string;
  itemName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  purchaseDate: string;
  description: string | null;
  memberName: string | null;
  user: { name: string } | null;
}

export interface TarabiRecord {
  id: string;
  amount: number;
  paidAmount: number;
  payDate: string;
  member: { name: string };
  ramadanYear: { ramadanYear: string };
}

export interface FilteredExpenses {
  salary?: SalaryPayRecord[];
  purchase?: PurchaseRecord[];
  tarabi?: TarabiRecord[];
}

// ─── chart ─────────────────────────────────────────────────────────────────
export interface ChartMonth {
  month: string;
  monthIndex: number;
  fridayCollection: number;
  memberPayments: number;
  totalIncome: number;
  salaryExpense: number;
  purchaseExpense: number;
  totalExpense: number;
  net: number;
}

export interface MonthlyChartData {
  year: number;
  data: ChartMonth[];
  summary: { totalIncome: number; totalExpense: number; netBalance: number };
}

// ─── activities ────────────────────────────────────────────────────────────
export interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  amount?: number;
  date: string;
  by?: string;
  badge: "income" | "expense" | "member" | "staff";
}

// ─── member payment status ─────────────────────────────────────────────────
export interface MemberPaymentStatus {
  monthKey: string;
  summary: {
    totalMembers: number;
    paidCount: number;
    unpaidCount: number;
    paymentRate: number;
    expectedAmount: number;
    collectedAmount: number;
    pendingAmount: number;
  };
  paid: {
    id: string;
    name: string;
    phone: string | null;
    monthlyAmount: number;
    paidAmount: number;
    paidDate: string;
  }[];
  unpaid: {
    id: string;
    name: string;
    phone: string | null;
    monthlyAmount: number;
  }[];
}

// ─── staff salary overview ─────────────────────────────────────────────────
export interface StaffSalaryOverview {
  month: string;
  staffCount: number;
  totalSalaryDue: number;
  totalPaid: number;
  totalDue: number;
  staff: {
    id: string;
    name: string;
    role: string;
    baseSalary: number;
    thisMonthTotal: number;
    paid: number;
    due: number;
    status: "PAID" | "PARTIAL" | "UNPAID";
  }[];
}

// ─── filter query params ────────────────────────────────────────────────────
export interface StatsQueryParams extends DashboardFilter {}

export interface CollectionQueryParams extends DashboardFilter {
  type?: "friday" | "member" | "other" | "all";
}

export interface ExpenseQueryParams extends DashboardFilter {
  type?: "salary" | "purchase" | "tarabi" | "all";
}





import { useState, useMemo } from "react";

export const MONTHS = [
  "All", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function useDashboardFilter() {
  const [mode, setMode] = useState<"date" | "month" | "year">("month");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const reset = () => {
    setMode("month");
    setMonth(new Date().getMonth() + 1);
    setYear(new Date().getFullYear());
  };

  const filter = useMemo(() => ({
    mode,
    date: mode === "date" ? date : undefined,
    month: mode === "month" ? month : undefined,
    year: (mode === "month" || mode === "year") ? year : undefined,
  }), [mode, date, month, year]);

  const label = useMemo(() => {
    if (mode === "date") return date;
    if (mode === "month") return `${MONTHS[month]}, ${year}`;
    return `Year ${year}`;
  }, [mode, date, month, year]);

  return { mode, setMode, date, setDate, month, setMonth, year, setYear, reset, filter, label, MONTHS };
}
