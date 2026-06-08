import ContentLecturerDetail from "./Content-Lecturer-Detail";
import SetupDataLecturerDetail from "./setup-data-lecturer-detail";

interface Props {
    id: string;
}

export default function LecturerDetailManager({ id }: Props) {
    return (
        <>
            <SetupDataLecturerDetail id={id} />
            <ContentLecturerDetail />
        </>
    );
}
