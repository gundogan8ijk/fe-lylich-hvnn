import ContentLecturerList from "./(list)/Content-Lecturer-List";
import SetupDataLecturerList from "./(list)/setup-data-lecturer-list";

export default function AdminLecturerPage() {
    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SetupDataLecturerList />
            <ContentLecturerList />
        </div>
    );
}
