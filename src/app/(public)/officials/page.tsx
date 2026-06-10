import SetupDataLecturerPublic from "./setup-data-lecturer-public";
import ContentLecturerPublic from "./content-lecturer-public";

export default function PublicLecturerPage() {
    return (
        <main className="flex flex-col bg-background w-full max-w-7xl mx-auto px-4 py-8">
            <SetupDataLecturerPublic />
            <ContentLecturerPublic />
        </main>
    );
}
