import ContentResearchCharts from "./(content)/content-research-charts";
import SetupDataResearchCharts from "./(content)/setup-data-research-charts";

export default function ResearchChartsPage() {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SetupDataResearchCharts />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Thống Kê Nghiên Cứu</h1>
      </div>
      <ContentResearchCharts />
    </div>
  );
}
