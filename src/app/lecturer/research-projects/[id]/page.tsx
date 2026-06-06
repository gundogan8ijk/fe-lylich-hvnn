import ProjectDetailSetupData from "./(content)/ProjectDetailSetupData"
import ProjectDetailContent from "./(content)/content"

type Props = {
    params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: Props) {
    const { id } = await params

    return (
        <>
            <ProjectDetailSetupData id={id} />
            <ProjectDetailContent />
        </>
    )
}
