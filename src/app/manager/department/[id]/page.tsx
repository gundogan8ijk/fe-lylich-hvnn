import { DepartmentDetailInfo } from "./(info-detail)/DepartmentInfo";
import { DisciplinesGroup } from "./(disciplines-external)/disciplines-Group";
import { MembersGroup } from "./(member)/members-Group";

export default async function DepartmentDetail({ params }: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;

    return (
        <div className="">
            <DepartmentDetailInfo id={id} ></DepartmentDetailInfo>
            <DisciplinesGroup id={id}></DisciplinesGroup>
            <MembersGroup id={id}></MembersGroup>
        </div>
    );
}
