import LecturerDetailManager from "./LecturerDetailManager";

export default async function ManagerLecturerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <LecturerDetailManager id={id} />
        </div>
    );
}
