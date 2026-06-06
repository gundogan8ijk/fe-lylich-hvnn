"use client";

import Link from "next/link";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock, ArrowLeft, KeyRound } from "lucide-react";
import { resetPasswordActionHook } from "@/Authen/authen-hook";

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";
    const token = searchParams.get("token") || "";

    const [form, setForm] = React.useState({
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [successMsg, setSuccessMsg] = React.useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validatePassword = (pwd: string) => {
        if (pwd.length < 6) return "Mật khẩu tối thiểu phải từ 6 ký tự.";
        if (!/[A-Z]/.test(pwd)) return "Mật khẩu phải chứa ít nhất 1 chữ viết hoa.";
        if (!/[a-z]/.test(pwd)) return "Mật khẩu phải chứa ít nhất 1 chữ viết thường.";
        if (!/[0-9]/.test(pwd)) return "Mật khẩu phải chứa ít nhất 1 chữ số.";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");

        if (!email || !token) {
            setError("Đường dẫn thiếu Email hoặc Token xác minh. Vui lòng kiểm tra lại email của bạn.");
            return;
        }

        const pwdError = validatePassword(form.password);
        if (pwdError) {
            setError(pwdError);
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Mật khẩu xác nhận không khớp.");
            return;
        }

        setLoading(true);
        try {
            const err = await resetPasswordActionHook({
                email,
                password: form.password,
                token,
            });

            if (err) {
                setError(err);
            } else {
                setSuccessMsg("Đặt lại mật khẩu thành công! Bạn có thể đăng nhập bằng mật khẩu mới.");
                setForm({ password: "", confirmPassword: "" });
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
                <h1 className="text-2xl font-extrabold mb-2 text-gray-800 tracking-tight">Đặt Lại Mật Khẩu</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Điền mật khẩu mới của bạn bên dưới để khôi phục tài khoản.
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
                    {/* Password input */}
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">
                            <Lock size={18} />
                        </span>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Mật khẩu mới"
                            className="border rounded-lg pl-10 pr-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* Confirm Password input */}
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">
                            <KeyRound size={18} />
                        </span>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Xác nhận mật khẩu mới"
                            className="border rounded-lg pl-10 pr-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer mt-4 w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
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
