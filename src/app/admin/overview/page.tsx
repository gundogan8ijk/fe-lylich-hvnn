import ContentOverview from "./(content)/content-overview";
import SetupDataOverview from "./(content)/setup-data-overview";

export default function OverviewPage() {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SetupDataOverview />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Thống Kê Tổng Quan</h1>
      </div>
      <ContentOverview />
    </div>
  );
}
