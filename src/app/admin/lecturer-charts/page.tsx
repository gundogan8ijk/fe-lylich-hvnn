import ContentLecturerCharts from "./(content)/content-lecturer-charts";
import SetupDataLecturerCharts from "./(content)/setup-data-lecturer-charts";

export default function LecturerChartsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SetupDataLecturerCharts />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Thống Kê Giảng Viên</h1>
      </div>
      <ContentLecturerCharts />
    </div>
  );
}
