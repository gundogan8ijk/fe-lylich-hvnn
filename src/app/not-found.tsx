import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold">404</h1>

                <p className="mt-4 text-gray-500">
                    Trang không tồn tại
                </p>

                <Link
                    href="/"
                    className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
                >
                    Về trang chủ
                </Link>
            </div>
        </div>
    )
}