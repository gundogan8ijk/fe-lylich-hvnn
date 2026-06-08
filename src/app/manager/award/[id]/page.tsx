import ContentAwardDetail from './content-award-detail'
import SetupDataAwardDetail from './setup-data-award-detail'

export default async function ManagerAwardDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    return (
        <div className="w-full">
            <SetupDataAwardDetail id={id} />
            <ContentAwardDetail />
        </div>
    )
}
