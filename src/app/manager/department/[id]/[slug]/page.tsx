import { DisciplineDetailInfo } from "./(info-detail)/DisciplineInfo";
import { CoursesGroup } from "./(course)/courses-Group";
import { MembersGroup } from "./(member)/members-Group";

export default async function DisciplineDetail({ params }: {
    params: Promise<{ id: string, slug: string }>
}) {
    const { id, slug } = await params;

    return (
        <div className="flex flex-col gap-y-8 pb-12">
            <DisciplineDetailInfo id={id} disciplineId={slug} />
            
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            </div>

            <CoursesGroup id={id} disciplineId={slug} />

            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            </div>

            <MembersGroup id={id} disciplineId={slug} />
        </div>
    );
}
