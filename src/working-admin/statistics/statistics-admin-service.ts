import { fail, success } from "@/_lib/response-helper";
import { api } from "@/_Common/_services/axios-service-config";
import { OverviewStatsDto, LecturerChartsResponse, ChartDataDto, ResearchChartDto } from "./statistics-admin-type";
import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import axios from "axios";

export const getOverviewStatsApi = async (year?: number, month?: number): Promise<ApiResponse<OverviewStatsDto>> => {
  try {
    const params = new URLSearchParams();
    if (year !== undefined) params.append("year", year.toString());
    if (month !== undefined) params.append("month", month.toString());
    const qs = params.toString() ? `?${params.toString()}` : "";
    
    const response = await api.get<OverviewStatsDto>(`/admin/statistics/overview${qs}`);
    return success(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      return fail(data?.message || "Lỗi tải thống kê tổng quan", data?.errors);
    }
    return fail("Lỗi tải thống kê tổng quan");
  }
};

export const getLecturerChartsApi = async (year?: number, month?: number, departmentId?: string): Promise<ApiResponse<LecturerChartsResponse>> => {
  try {
    const params = new URLSearchParams();
    if (year !== undefined) params.append("year", year.toString());
    if (month !== undefined) params.append("month", month.toString());
    if (departmentId !== undefined) params.append("departmentId", departmentId);
    const qs = params.toString() ? `?${params.toString()}` : "";

    const response = await api.get<LecturerChartsResponse>(`/admin/statistics/lecturer-charts${qs}`);
    return success(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      return fail(data?.message || "Lỗi tải thống kê giảng viên", data?.errors);
    }
    return fail("Lỗi tải thống kê giảng viên");
  }
};

export const getResearchChartsApi = async (year?: number, month?: number, departmentId?: string): Promise<ApiResponse<ResearchChartDto[]>> => {
  try {
    const params = new URLSearchParams();
    if (year !== undefined) params.append("year", year.toString());
    if (month !== undefined) params.append("month", month.toString());
    if (departmentId !== undefined) params.append("departmentId", departmentId);
    const qs = params.toString() ? `?${params.toString()}` : "";

    const response = await api.get<ResearchChartDto[]>(`/admin/statistics/research-charts${qs}`);
    return success(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      return fail(data?.message || "Lỗi tải thống kê nghiên cứu", data?.errors);
    }
    return fail("Lỗi tải thống kê nghiên cứu");
  }
};
