import CourseDetailClient from "./CourseDetailClient";

export default async function CourseDetailPage({ 
    params 
}: {
    params: Promise<{ id: string, slug: string, cour: string }>
}) {
    const { id, slug, cour } = await params;

    return (
        <div className="bg-slate-50 min-h-screen">
            <CourseDetailClient 
                departmentId={id} 
                disciplineId={slug} 
                courseId={cour} 
            />
        </div>
    );
}
