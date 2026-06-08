import CourseDetailClient from "./CourseDetailClient";

export default async function CourseDetailPage({ 
    params 
}: {
    params: Promise<{ id: string, slug: string, cour: string }>
}) {
    const { id, slug, cour } = await params;

    return (
        <div className="w-full">
            <CourseDetailClient 
                departmentId={id} 
                disciplineId={slug} 
                courseId={cour} 
            />
        </div>
    );
}
