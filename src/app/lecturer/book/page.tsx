import ContentBookList from "./(list)/Content-Book-List";
import SetupDataBookList from "./(list)/setup-data-book-list";

export default function BookPage() {
    return (
        <>
            <SetupDataBookList />
            <ContentBookList />
        </>
    );
}