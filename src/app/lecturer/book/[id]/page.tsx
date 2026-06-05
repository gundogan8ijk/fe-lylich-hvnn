import BookDetailSetupData from "./(content)/BookDetailSetupData";
import BookDetailContent from "./(content)/content";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return (
    <div>
      <BookDetailSetupData id={id} />
      <BookDetailContent />
    </div>
  );
}