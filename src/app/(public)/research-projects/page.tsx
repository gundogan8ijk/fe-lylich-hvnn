import SetupDataProjectPublic from "./setup-data-project-public";
import ContentProjectPublic from "./content-project-public";

export default function PublicProjectPage() {
    return (
        <main className="flex flex-col bg-background w-full max-w-7xl mx-auto px-4 py-8">
            <SetupDataProjectPublic />
            <ContentProjectPublic />
        </main>
    );
}
