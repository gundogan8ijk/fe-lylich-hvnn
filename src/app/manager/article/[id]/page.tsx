import ContentArticleDetailManager from "./content-article-detail";
import SetupDataArticleDetailManager from "./setup-data-article-detail";

export default async function ArticleManagerDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;

    return (
        <div>
            <SetupDataArticleDetailManager id={id} />
            <ContentArticleDetailManager />
        </div>
    );
}
