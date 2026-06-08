"use client";

import { LecturerItemAccountRecord } from "@/working-admin/lecturer/lecturer-admin-type";
import { User, Shield, Key, Hash, Phone, CreditCard, Mail, Plus } from "lucide-react";
import { useState } from "react";
import CreateAccountDialog from "./Create-Account-Dialog";

interface Props {
    data: LecturerItemAccountRecord;
}

export default function LecturerCard({ data }: Props) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    return (
        <div className="flex flex-col bg-card rounded-xl border border-border/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
            {/* Header / Avatar */}
            <div className="relative h-24 bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="absolute -bottom-10 left-6">
                    <div className="h-20 w-20 rounded-full border-4 border-background bg-muted overflow-hidden flex items-center justify-center">
                        {data.avatarUrl ? (
                            <img src={data.avatarUrl} alt={data.fullName} className="h-full w-full object-cover" />
                        ) : (
                            <User className="h-10 w-10 text-muted-foreground/50" />
                        )}
                    </div>
                </div>
                <div className="absolute top-4 right-4 flex gap-1 items-center flex-wrap justify-end">
                    {data.roles.map(role => (
                        <span key={role} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {role}
                        </span>
                    ))}
                    {!data.email && (
                        <button 
                            onClick={() => setIsCreateOpen(true)}
                            className="inline-flex items-center justify-center p-1 rounded-full bg-primary text-white hover:bg-primary/90 transition shadow-sm"
                            title="Tạo tài khoản"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 pt-12 pb-5 px-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground line-clamp-1" title={data.fullName}>
                        {data.fullName}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                        <Hash className="w-3.5 h-3.5" />
                        <span>{data.lecturerCode}</span>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/50 space-y-2.5">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4 shrink-0" />
                        <span className="line-clamp-1">{data.email || "Chưa có Email"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CreditCard className="w-4 h-4 shrink-0" />
                        <span className="line-clamp-1">{data.cccd || "Chưa có CCCD"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4 shrink-0" />
                        <span>{data.gender || "Chưa xác định"}</span>
                    </div>
                </div>
            </div>

            {/* Create Account Dialog */}
            <CreateAccountDialog 
                isOpen={isCreateOpen} 
                onClose={() => setIsCreateOpen(false)} 
                lecturer={data} 
            />
        </div>
    );
}
