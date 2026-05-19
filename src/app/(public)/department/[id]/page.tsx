import { DepartmentDetailClient } from "./DepartmentClient";
import { DisciplinesGroup } from "./disciplines-Group";
import { MembersGroup } from "./members-Group";

export default async function DepartmentDetail({ params }: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;

    return (
        <div className="">
            <DepartmentDetailClient id={id} ></DepartmentDetailClient>
            <DisciplinesGroup id={id}></DisciplinesGroup>
            <MembersGroup id={id}></MembersGroup>
        </div>
    );
}
