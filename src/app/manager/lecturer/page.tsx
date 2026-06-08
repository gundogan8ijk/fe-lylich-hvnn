import LecturerGrid from "./(list)/lecturer-grid";
import LecturerHeader from "./(list)/lecturer-header";
import LecturerPagination from "./(list)/lecturer-pagination";
import SetupDataLecturerList from "./(list)/setup-data-lecturer-list";

export default function LecturerPage() {
    return (
        <main className="flex flex-col bg-background w-full max-w-7xl mx-auto px-4">
            <SetupDataLecturerList />
            <LecturerHeader />
            <div className="flex-1 flex flex-col w-full">
                <LecturerGrid />
            </div>
            <LecturerPagination />
        </main>
    );
}
