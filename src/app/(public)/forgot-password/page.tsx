import { Metadata } from 'next';
import ForgotPasswordForm from './ForgotPasswordForm';

export const metadata: Metadata = {
    title: 'Quên mật khẩu',
    description: 'Yêu cầu liên kết đặt lại mật khẩu',
};

export default function ForgotPasswordPage() {
    return (
        <div className='p-5 bg-gray-50'>
            <ForgotPasswordForm />
        </div>
    );
}
