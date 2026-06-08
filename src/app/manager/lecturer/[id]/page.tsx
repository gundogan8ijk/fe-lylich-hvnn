import LecturerDetailManager from "./LecturerDetailManager";

export default async function ManagerLecturerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <div className="w-full">
            <LecturerDetailManager id={id} />
        </div>
    );
}
