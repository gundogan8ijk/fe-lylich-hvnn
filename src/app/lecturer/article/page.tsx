import ContentArticlesList from "./(list)/Content-Article-List";
import SetupDataArticleList from "./(list)/setup-dataArticle-list";

export default function ProfilePage() {
    return (
        <>
            <SetupDataArticleList></SetupDataArticleList>
            <ContentArticlesList></ContentArticlesList>
        </>
    );
}
