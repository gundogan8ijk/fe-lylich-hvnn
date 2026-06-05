import ProjectExternalDetailContent from "./(content)/content";
import ProjectExternalDetailSetupData from "./(content)/ProjectExternalDetailSetupData";

export default async function ProjectExternalDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = (await params).id;

    return (
        <div>
            <ProjectExternalDetailSetupData id={id} />
            <ProjectExternalDetailContent />
        </div>
    );
}