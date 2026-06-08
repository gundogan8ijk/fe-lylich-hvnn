import ContentEducationDetail from "./content-education-detail";
import SetupDataEducationDetail from "./setup-data-education-detail";

export default async function EducationDetailManagerPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;

    return (
        <div>
            <SetupDataEducationDetail id={id} />
            <ContentEducationDetail />
        </div>
    );
}
