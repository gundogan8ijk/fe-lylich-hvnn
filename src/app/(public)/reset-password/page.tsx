import { Metadata } from 'next';
import { Suspense } from 'react';
import ResetPasswordForm from './ResetPasswordForm';

export const metadata: Metadata = {
    title: 'Đặt lại mật khẩu',
    description: 'Tạo mật khẩu mới cho tài khoản',
};

export default function ResetPasswordPage() {
    return (
        <div className='p-5 bg-gray-50'>
            <Suspense fallback={<div className="text-center p-10">Đang tải...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}
