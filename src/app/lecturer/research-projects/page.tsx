import ContentProjectsList from "./(list)/Project-content-List";
import SetupDataProjectList from "./(list)/setup-dataProject-list";

export default function ProfilePage() {
    return (
        <>
            <SetupDataProjectList></SetupDataProjectList>
            <ContentProjectsList></ContentProjectsList>
        </>
    );
}
