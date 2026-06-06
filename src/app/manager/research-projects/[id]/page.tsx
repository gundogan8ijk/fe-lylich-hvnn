import ProjectMangerDetailContent from "./(content)/content";
import SetupDataProjectMangerDetail from "./setup-data";

export default async function ProjectMangerDetail({ params }: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;

    return (
        <div className="">
            <SetupDataProjectMangerDetail id={id}/>
            <ProjectMangerDetailContent/>
        </div>
    );
}
