import { DepartmentDetailClient } from "./DepartmentClient";

export default async function DepartmentDetail({ params }: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;

    return (
        <div>
            <DepartmentDetailClient id={id} ></DepartmentDetailClient>
        </div>
    );
}
