export type OverviewStatsDto = {
  totalLecturers: number;
  totalAccounts: number;
  totalDepartments: number;
  activeAccounts: number;
  lockedAccounts: number;
  totalArticles: number;
  totalBooks: number;
  totalCourses: number;
  totalDisciplines: number;
  totalResearchProjects: number;
  totalExternalProjects: number;
};

export type ChartDataDto = {
  label: string;
  value: number;
};

export type ResearchChartDto = {
  label: string;
  completed: number;
  pending: number;
  cancelled: number;
};

export type LecturerChartsResponse = {
  degreeStats: ChartDataDto[];
  departmentStats: ChartDataDto[];
  awardStats: ChartDataDto[];
};
