import { DisciplineInfoPublic } from "./DisciplineInfoPublic";
import { CoursesGroupPublic } from "./courses-GroupPublic";
import { MembersGroupPublic } from "./members-GroupPublic";

export default async function DisciplineDetailPublic({ params }: {
    params: Promise<{ id: string, slug: string }>
}) {
    const { id, slug } = await params;

    return (
        <div className="flex flex-col gap-y-8 pb-12">
            <DisciplineInfoPublic departmentId={id} disciplineId={slug} />
            
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            </div>

            <CoursesGroupPublic departmentId={id} disciplineId={slug} />

            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            </div>

            <MembersGroupPublic departmentId={id} disciplineId={slug} />
        </div>
    );
}
