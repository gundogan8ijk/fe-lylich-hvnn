import { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
    title: 'Đăng nhập hệ thống',
    description: 'Vui lòng đăng nhập để tiếp tục',
};

export default function LoginPage() {
    return (
        <div className=' p-5  bg-gray-50'>
            <LoginForm />
        </div>
    );
}