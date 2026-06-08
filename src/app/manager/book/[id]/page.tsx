import ContentBookDetail from "./content-book-detail";
import SetupDataBookDetail from "./setup-data-book-detail";

export default async function BookDetailManagerPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;

    return (
        <div>
            <SetupDataBookDetail id={id} />
            <ContentBookDetail />
        </div>
    );
}
