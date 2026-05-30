"use client";

import Link from "next/link";
import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginActionHook, refreshTokenHook } from "@/Authen/authen-hook";

export default function LoginPage() {
    const [form, setForm] = React.useState({ email: "", password: "", });
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        let isMounted = true;
        const checkAutoRefresh = async () => {
            try {
                const res = await refreshTokenHook();
                if (res.success && isMounted) {
                    const params = new URLSearchParams(window.location.search);
                    const from = params.get("from");
                    if (from) {
                        window.location.href = `/dashboard?from=${encodeURIComponent(from)}`;
                    } else {
                        window.location.href = "/dashboard";
                    }
                }
            } catch (err) {
                // Ignore silent refresh failures
            }
        };

        checkAutoRefresh();

        return () => {
            isMounted = false;
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const err= await loginActionHook(form);
        if(err) setError(err);
        setLoading(false);
    };


    return (
        <>
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Đăng Nhập</h1>

            <form
                onSubmit={handleSubmit}
                className=" flex items-center justify-center"
            >
                <div className="bg-white p-7 rounded-2xl shadow-lg w-96 text-center">

                    <p className="text-red-500 text-sm text-center mb-3"> {error || "\u00A0"}</p>

                    {/* Email & Password */}
                    <div className="flex flex-col gap-4">
                        <input
                            onChange={handleChange}
                            required
                            type="email"
                            name="email"
                            placeholder="Username@gmail.com"
                            autoComplete="username"
                            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        />

                        {/* Password input có con mắt */}
                        <div className="relative">
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (<EyeOff size={18} />) : (<Eye size={18} />)}
                            </button>
                        </div>
                    </div>

                    {/* Login button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer mt-6 w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="mx-3 text-gray-400 text-sm">OR</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    {/* Footer links */}
                    <div className="mt-6 text-sm text-gray-600 flex flex-col gap-2">
                        <Link href="/forgot-password" className="text-sky-500 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                </div>
            </form>

        </>
    );
}
