import ContentBookList from "./(list)/content-book-list";
import SetupDataBookList from "./(list)/setup-data-book-list";

export default function BookManagerPage() {
    return (
        <>
            <SetupDataBookList />
            <ContentBookList />
        </>
    );
}
