import { DisciplineDetailInfo } from "./(info-detail)/DisciplineInfo";
import { CoursesGroup } from "./(course)/courses-Group";
import { MembersGroup } from "./(member)/members-Group";

export default async function DisciplineDetail({ params }: {
    params: Promise<{ id: string, slug: string }>
}) {
    const { id, slug } = await params;

    return (
        <div className="">
            <DisciplineDetailInfo id={id} disciplineId={slug}></DisciplineDetailInfo>
            <CoursesGroup id={id} disciplineId={slug}></CoursesGroup>
            <MembersGroup id={id} disciplineId={slug}></MembersGroup>
        </div>
    );
}
