import MangerProjectGrid from "./(list)/projectManger-grid";
import ProjectMangerHeader from "./(list)/projectManger-header";
import MangerProjectPagination from "./(list)/projectManger-pagin";

export default function ProjectMangerPage() {
    return (
        <main className="h-full flex-1 flex flex-col bg-background ">
            <ProjectMangerHeader />
            <div className="flex-1 flex flex-col">
                <MangerProjectGrid />
            </div>
            <div className="mt-auto">
                <MangerProjectPagination />
            </div>

        </main>
    );
}