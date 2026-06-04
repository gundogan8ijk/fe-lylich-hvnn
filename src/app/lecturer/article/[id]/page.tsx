import ArticleDetailContent from "./(content)/content";
import ArticleDetailSetupData from "./setup-dataArticle-list";

export default async function ArticleDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;

    return (
        <div>
            <ArticleDetailSetupData id={id} />
            <ArticleDetailContent />
        </div>
    );
}
