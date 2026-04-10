import {
  CollectionQueryParams,
  ExpenseQueryParams,
  FilteredCollections,
  FilteredExpenses,
  StatsQueryParams,
} from "@/src/components/ui/dashboard/Usedashboardfilter";
import { baseApi } from "../../api/baseApi";
import type {
  ApiResponse,
  DashboardStats,
  MonthlyChartData,
  Activity,
  MemberPaymentStatus,
  StaffSalaryOverview,
} from "@/src/types/dashboardtypes";

// helper: strips undefined values so RTK Query doesn't send empty params
function cleanParams<T extends Record<string, any>>(params: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== ""),
  ) as Partial<T>;
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ── GET /dashboard/stats ──────────────────────────────────────────────
    // mode=date  → date=YYYY-MM-DD
    // mode=month → month=1-12 & year=YYYY
    // mode=year  → year=YYYY
    getDashboardStats: builder.query<
      ApiResponse<DashboardStats>,
      StatsQueryParams | void
    >({
      query: (filter) => ({
        url: "/dashboard/stats",
        method: "GET",
        params: filter ? cleanParams(filter) : undefined,
      }),
      providesTags: ["Dashboard"],
    }),

    // ── GET /dashboard/collections ────────────────────────────────────────
    getFilteredCollections: builder.query<
      ApiResponse<FilteredCollections>,
      CollectionQueryParams
    >({
      query: (params) => ({
        url: "/dashboard/collections",
        method: "GET",
        params: cleanParams(params),
      }),
      providesTags: ["Dashboard"],
    }),

    // ── GET /dashboard/expenses ───────────────────────────────────────────
    getFilteredExpenses: builder.query<
      ApiResponse<FilteredExpenses>,
      ExpenseQueryParams
    >({
      query: (params) => ({
        url: "/dashboard/expenses",
        method: "GET",
        params: cleanParams(params),
      }),
      providesTags: ["Dashboard"],
    }),

    // ── GET /dashboard/chart/monthly?year=YYYY ────────────────────────────
    getMonthlyChart: builder.query<
      ApiResponse<MonthlyChartData>,
      { year?: number }
    >({
      query: ({ year = new Date().getFullYear() } = {}) => ({
        url: "/dashboard/chart/monthly",
        method: "GET",
        params: { year },
      }),
      providesTags: ["Dashboard"],
    }),

    // ── GET /dashboard/activities?limit=N ────────────────────────────────
    getRecentActivities: builder.query<
      ApiResponse<Activity[]>,
      { limit?: number }
    >({
      query: ({ limit = 10 } = {}) => ({
        url: "/dashboard/activities",
        method: "GET",
        params: { limit },
      }),
      providesTags: ["Dashboard"],
    }),

    // ── GET /dashboard/members/payment-status?month=YYYY-MM ──────────────
    getMemberPaymentStatus: builder.query<
      ApiResponse<MemberPaymentStatus>,
      { month?: string }
    >({
      query: ({ month } = {}) => ({
        url: "/dashboard/members/payment-status",
        method: "GET",
        params: month ? { month } : {},
      }),
      providesTags: ["Dashboard"],
    }),

    // ── GET /dashboard/staff/salary-overview ─────────────────────────────
    getStaffSalaryOverview: builder.query<
      ApiResponse<StaffSalaryOverview>,
      void
    >({
      query: () => ({
        url: "/dashboard/staff/salary-overview",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetFilteredCollectionsQuery,
  useGetFilteredExpensesQuery,
  useGetMonthlyChartQuery,
  useGetRecentActivitiesQuery,
  useGetMemberPaymentStatusQuery,
  useGetStaffSalaryOverviewQuery,
} = dashboardApi;
