import SetupDataArticlePublic from "./setup-data-article-public";
import ContentArticlePublic from "./content-article-public";

export default function PublicArticlePage() {
    return (
        <main className="flex flex-col bg-background w-full max-w-7xl mx-auto px-4 py-8">
            <SetupDataArticlePublic />
            <ContentArticlePublic />
        </main>
    );
}
