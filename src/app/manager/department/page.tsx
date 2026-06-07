import DepartmentGrid from "./(list)/department-grid";
import DepartmentHeader from "./(list)/department-header";
import DepartmentPagination from "./(list)/department-pagination";

export default function DepartmentPage() {
    return (
        <main className="flex flex-col bg-background w-full max-w-7xl mx-auto px-4 py-12">
                <DepartmentHeader />
                <div className="flex-1 flex flex-col w-full">
                    <DepartmentGrid />
                </div>
                <DepartmentPagination />
        </main>
    );
}

