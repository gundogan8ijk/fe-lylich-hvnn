import SetupDataProjectExternalPublic from "./setup-data-project-external-public";
import ContentProjectExternalPublic from "./content-project-external-public";

export default function PublicProjectExternalPage() {
    return (
        <main className="flex flex-col bg-background w-full max-w-7xl mx-auto px-4 py-8">
            <SetupDataProjectExternalPublic />
            <ContentProjectExternalPublic />
        </main>
    );
}
