import { DepartmentDetailInfo } from "./(info-detail)/DepartmentInfo";
import { DisciplinesGroup } from "./(disciplines-external)/disciplines-Group";
import { MembersGroup } from "./(member)/members-Group";

export default async function DepartmentDetail({ params }: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;

    return (
        <div className="flex flex-col gap-y-8 pb-12">
            <DepartmentDetailInfo id={id} />
            
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            </div>

            <DisciplinesGroup id={id} />
            
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            </div>

            <MembersGroup id={id} />
        </div>
    );
}
