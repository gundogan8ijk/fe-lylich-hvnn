import ContentProjectsList from "./Project-content-List";
import SetupDataProjectList from "./setup-dataProject-list";

export default function ProfilePage() {
    return (
        <>
            <SetupDataProjectList></SetupDataProjectList>
            <ContentProjectsList></ContentProjectsList>
        </>
    );
}
