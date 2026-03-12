import { baseApi } from "../../api/baseApi";
import type {
  ApiResponse,
  DashboardStats,
  MonthlyChartData,
  Activity,
  MemberPaymentStatus,
  StaffSalaryOverview,
} from "@/src/types/dashboard.types";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /dashboard/stats
    getDashboardStats: builder.query<ApiResponse<DashboardStats>, void>({
      query: () => ({
        url: "/dashboard/stats",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    // GET /dashboard/chart/monthly?year=YYYY
    getMonthlyChart: builder.query<
      ApiResponse<MonthlyChartData>,
      { year?: number }
    >({
      query: ({ year = new Date().getFullYear() } = {}) => ({
        url: `/dashboard/chart/monthly`,
        method: "GET",
        params: { year },
      }),
      providesTags: ["Dashboard"],
    }),

    // GET /dashboard/activities?limit=N
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

    // GET /dashboard/members/payment-status?month=YYYY-MM
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

    // GET /dashboard/staff/salary-overview
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
  useGetMonthlyChartQuery,
  useGetRecentActivitiesQuery,
  useGetMemberPaymentStatusQuery,
  useGetStaffSalaryOverviewQuery,
} = dashboardApi;
