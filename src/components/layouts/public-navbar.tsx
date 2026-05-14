'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, LogIn } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import logo from '#/images/logoHVNN.png';
import backgroundImage from '#/images/backgroundImage.jpg';

const navItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Sản phẩm', href: '/products' },
    { label: 'Khoa', href: '/department' },
    { label: 'Blog', href: '/blog' },
    { label: 'Liên hệ', href: '/contact' },
];

export function PublicNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full">
            {/* Desktop Navbar Content */}
            <div className="hidden md:block relative z-10">
                {/* background */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 -z-10 hidden lg:block">
                        <Image
                            src={backgroundImage}
                            alt="Background"
                            fill unoptimized priority
                            className="object-cover object-fill"
                        />

                        <div className="absolute inset-0 bg-slate-900/90" />
                    </div>

                    <div className="border-b border-white/10">
                        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="relative w-24 h-24">
                                    <Image
                                        src={logo}
                                        alt="HVNN" unoptimized
                                        className="object-contain object-fill"
                                    />
                                </div>
                                <div className="leading-tight flex flex-col gap-y-3">
                                    <div className="text-white font-semibold tracking-tigh text-2xl">Học Viện Nông Nghiệp Việt Nam</div>
                                    <div className="text-white/85 text-sm">Lý lịch khoa học của các cán bộ</div>
                                </div>
                            </Link>

                            <Link
                                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors rounded-md px-4 py-2"
                                href="/login" // Don't forget your destination!
                            >
                                <LogIn className="w-4 h-4 mr-2 shrink-0" />
                                <span>Log in</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Row - Navigation & Search (nền riêng, không dùng background image) */}
                <div className="bg-white/90 backdrop-blur border-b border-slate-200">
                    <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between gap-6">
                        <div className="flex items-center gap-8">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`transition-colors duration-200 font-medium text-sm ${isActive
                                            ? 'text-emerald-700 font-semibold'
                                            : 'text-slate-700 hover:text-slate-950'
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="relative w-full max-w-xs">
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white text-slate-900 placeholder-slate-400 border border-slate-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="md:hidden relative overflow-hidden  bg-gradient-to-r from-green-500 to-emerald-600">

                <div className="relative z-10 border-b border-white/10">
                    <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src={logo} alt="HVNN" width={36} height={36} />
                            <span className="text-white font-semibold tracking-tight">HVNN</span>
                        </Link>

                        <button
                            type="button"
                            aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
                            aria-expanded={isOpen}
                            onClick={() => setIsOpen((v) => !v)}
                            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
                {/* Backdrop */}
                {isOpen ? (
                    <button
                        type="button"
                        aria-label="Đóng menu"
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-40 bg-black/30"
                    />
                ) : null}

                {/* Panel */}
                <div
                    className={[
                        'fixed left-0 right-0 top-[72px] z-50 origin-top transition-all duration-200',
                        isOpen ? 'pointer-events-auto scale-y-100 opacity-100' : 'pointer-events-none scale-y-95 opacity-0',
                    ].join(' ')}
                >
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                            <div className="p-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-white text-slate-900 placeholder-slate-400 border border-slate-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                </div>

                                <div className="mt-4 grid gap-1">
                                    {navItems.map((item) => {
                                        const isActive = pathname === item.href;

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`rounded-lg px-3 py-2 transition-colors font-medium ${isActive
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                                                    }`}
                                            >
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                </div>

                                <div className="mt-4">
                                    <Button
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                        size="lg"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <LogIn className="w-4 h-4" />
                                        <Link href="/login">Đăng nhập</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}