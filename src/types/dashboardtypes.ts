
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ── Overview ──────────────────────────────────────────────────
export interface DashboardOverview {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  currentMonthIncome: number;
  currentMonthExpense: number;
  currentMonthNet: number;
  incomeGrowthPercent: number;
}

// ── Collections ───────────────────────────────────────────────
export interface FridayCollectionSummary {
  total: number;
  count: number;
  thisMonth: number;
  thisMonthCount: number;
}

export interface MemberCollectionSummary {
  total: number;
  count: number;
  thisMonth: number;
  thisMonthCount: number;
}

export interface OtherCollectionSummary {
  totalEvents: number;
  thisMonthEvents: number;
}

export interface CollectionsSummary {
  friday: FridayCollectionSummary;
  member: MemberCollectionSummary;
  other: OtherCollectionSummary;
}

// ── Members ───────────────────────────────────────────────────
export interface UnpaidMember {
  id: string;
  name: string;
  phone: string | null;
  monthlyAmount: number;
}

export interface MembersSummary {
  total: number;
  active: number;
  unpaidThisMonth: number;
  upcomingDues: UnpaidMember[];
}

// ── Staff ─────────────────────────────────────────────────────
export interface StaffSummary {
  total: number;
  active: number;
  totalSalaryPaid: number;
  thisMonthSalaryPaid: number;
}

// ── Purchases ─────────────────────────────────────────────────
export interface PurchasesSummary {
  totalAmount: number;
  totalCount: number;
  thisMonthAmount: number;
}

// ── Ramadan ───────────────────────────────────────────────────
export interface RamadanSummary {
  totalDoners: number;
}

// ── Main Dashboard Stats ──────────────────────────────────────
export interface DashboardStats {
  mosque: { id: string };
  overview: DashboardOverview;
  collections: CollectionsSummary;
  members: MembersSummary;
  staff: StaffSummary;
  purchases: PurchasesSummary;
  ramadan: RamadanSummary;
}

// ── Monthly Chart ─────────────────────────────────────────────
export interface MonthlyChartEntry {
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

export interface MonthlyChartSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

export interface MonthlyChartData {
  year: number;
  data: MonthlyChartEntry[];
  summary: MonthlyChartSummary;
}

// ── Activities ────────────────────────────────────────────────
export type ActivityBadge = "income" | "expense" | "member" | "staff";
export type ActivityType =
  | "friday_collection"
  | "member_payment"
  | "purchase"
  | "new_member"
  | "new_staff";

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  amount?: number;
  date: string;
  by?: string;
  badge: ActivityBadge;
}

// ── Member Payment Status ─────────────────────────────────────
export interface PaymentStatusSummary {
  totalMembers: number;
  paidCount: number;
  unpaidCount: number;
  paymentRate: number;
  expectedAmount: number;
  collectedAmount: number;
  pendingAmount: number;
}

export interface PaidMemberDetail {
  id: string;
  name: string;
  phone: string | null;
  monthlyAmount: number;
  paidAmount: number;
  paidDate: string;
}

export interface MemberPaymentStatus {
  monthKey: string;
  summary: PaymentStatusSummary;
  paid: PaidMemberDetail[];
  unpaid: UnpaidMember[];
}

// ── Staff Salary Overview ─────────────────────────────────────
export type SalaryStatus = "PAID" | "PARTIAL" | "UNPAID";

export interface StaffSalaryDetail {
  id: string;
  name: string;
  role: string;
  baseSalary: number;
  thisMonthTotal: number;
  paid: number;
  due: number;
  status: SalaryStatus;
}

export interface StaffSalaryOverview {
  month: string;
  staffCount: number;
  totalSalaryDue: number;
  totalPaid: number;
  totalDue: number;
  staff: StaffSalaryDetail[];
}
