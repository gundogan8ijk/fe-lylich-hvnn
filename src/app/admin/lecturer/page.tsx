import ContentLecturerList from "./(list)/Content-Lecturer-List";
import SetupDataLecturerList from "./(list)/setup-data-lecturer-list";

export default function AdminLecturerPage() {
    return (
        <main className="flex flex-col bg-background w-full max-w-7xl mx-auto px-4">
            <SetupDataLecturerList />
            <ContentLecturerList />
        </main>
    );
}
