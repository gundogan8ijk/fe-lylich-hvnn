import ContentProjectExternalDetail from "./content-project-external-detail";
import SetupDataProjectExternalDetail from "./setup-data-project-external-detail";

export default async function ProjectExternalDetailManagerPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;

    return (
        <div>
            <SetupDataProjectExternalDetail id={id} />
            <ContentProjectExternalDetail />
        </div>
    );
}
