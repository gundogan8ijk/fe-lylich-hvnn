import ContentProjectExternalList from "./(list)/Content-ProjectExternal-List";
import SetupDataProjectExternalList from "./(list)/setup-data-projectExternal-list";

export default function ProjectExternalPage() {
    return (
        <>
            <SetupDataProjectExternalList />
            <ContentProjectExternalList />
        </>
    );
}