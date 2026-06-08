import ContentArticleList from "./(list)/content-article-list";
import SetupDataArticleList from "./(list)/setup-data-article-list";

export default function ArticleManagerPage() {
    return (
        <>
            <SetupDataArticleList />
            <ContentArticleList />
        </>
    );
}
