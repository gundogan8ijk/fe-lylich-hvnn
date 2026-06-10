import DepartmentGrid from "./department-grid";
import DepartmentHeader from "./department-header";
import DepartmentPagination from "./department-pagination";

export default function DepartmentPage() {
    return (
        <main className="flex flex-col bg-background w-full max-w-7xl mx-auto px-4 py-8">
                <DepartmentHeader />
                <div className="flex-1 flex flex-col">
                    <DepartmentGrid />
                </div>
                <DepartmentPagination />
        </main>
    );
}

