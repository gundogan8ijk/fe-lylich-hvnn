"use client";

import Link from "next/link";
import React from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { forgotPasswordActionHook } from "@/Authen/authen-hook";

export default function ForgotPasswordForm() {
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [successMsg, setSuccessMsg] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMsg("");
        
        try {
            const err = await forgotPasswordActionHook(email);
            if (err) {
                setError(err);
            } else {
                setSuccessMsg("Yêu cầu thành công! Vui lòng kiểm tra hộp thư email của bạn.");
                setEmail("");
            }
        } catch (err) {
            setError("Có lỗi hệ thống xảy ra.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center border border-gray-100 transition-all duration-300 hover:shadow-2xl">
                <h1 className="text-2xl font-extrabold mb-2 text-gray-800 tracking-tight">Quên Mật Khẩu</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Nhập địa chỉ email đăng ký để nhận liên kết đặt lại mật khẩu.
                </p>

                {error && (
                    <div className="bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg text-left mb-4 border border-red-100 animate-pulse">
                        {error}
                    </div>
                )}

                {successMsg && (
                    <div className="bg-emerald-50 text-emerald-600 text-xs px-3 py-2 rounded-lg text-left mb-4 border border-emerald-100">
                        {successMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">
                            <Mail size={18} />
                        </span>
                        <input
                            onChange={handleChange}
                            required
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Nhập email của bạn"
                            autoComplete="email"
                            className="border rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer mt-4 w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Đang gửi..." : "Gửi yêu cầu"}
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-200"></div>
                    <span className="mx-3 text-gray-400 text-xs tracking-wider">HOẶC</span>
                    <div className="flex-grow h-px bg-gray-200"></div>
                </div>

                <div className="text-sm">
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 text-sky-500 hover:text-sky-600 font-medium hover:underline transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Quay lại Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
}
