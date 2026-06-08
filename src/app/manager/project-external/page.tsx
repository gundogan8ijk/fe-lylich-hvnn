import { Metadata } from 'next';
import ContentProjectExternalList from './(list)/content-project-external-list';
import SetupDataProjectExternalList from './(list)/setup-data-project-external-list';

export const metadata: Metadata = {
    title: 'Quản lý Đề tài ngoài trường',
    description: 'Danh sách Đề tài ngoài trường',
};

export default function ProjectExternalManagerPage() {
    return (
        <>
            <SetupDataProjectExternalList />
            <ContentProjectExternalList />
        </>
    );
}
