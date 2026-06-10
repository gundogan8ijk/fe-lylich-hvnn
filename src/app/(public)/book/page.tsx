import SetupDataBookPublic from "./setup-data-book-public";
import ContentBookPublic from "./content-book-public";

export default function PublicBookPage() {
    return (
        <main className="flex flex-col bg-background w-full max-w-7xl mx-auto px-4 py-8">
            <SetupDataBookPublic />
            <ContentBookPublic />
        </main>
    );
}
