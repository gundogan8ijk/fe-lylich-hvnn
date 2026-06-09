'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_components/ui/select";
import { searchNoAccountLecturersApi, registerLecturerAccountApi, LecturerNoAccountDto } from "@/working-admin/lecturer/lecturer-admin-service";
import { notify } from "@/_components/utils/Notify";
import { useDebounce } from "@/_components/query/search-Box-state";
import { Role } from "@/Authen/auth-type";
import { useAccountAdminStore } from "@/working-admin/account/account-admin-store";
import { Badge } from "@/_components/ui/badge";
import { X } from "lucide-react";

interface DialogCreateLecturerAccountProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DialogCreateLecturerAccount({ isOpen, onClose }: DialogCreateLecturerAccountProps) {
    const { triggerRefresh } = useAccountAdminStore();
    
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 300);
    const [lecturers, setLecturers] = useState<LecturerNoAccountDto[]>([]);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    const [selectedLecturerCode, setSelectedLecturerCode] = useState<string>("");
    const [selectedLecturerName, setSelectedLecturerName] = useState<string>("");
    const [email, setEmail] = useState("");
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleRole = (r: string) => {
        setSelectedRoles(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
    };

    // Fetch lecturers
    useEffect(() => {
        if (!isOpen) return;
        let isMounted = true;
        
        const fetchLecturers = async () => {
            setLoadingSearch(true);
            const res = await searchNoAccountLecturersApi(debouncedSearch);
            if (isMounted) {
                if (res.code === 1) {
                    setLecturers(res.data);
                }
                setLoadingSearch(false);
            }
        };
        
        fetchLecturers();
        
        return () => { isMounted = false; };
    }, [debouncedSearch, isOpen]);

    // Reset state on close
    useEffect(() => {
        if (!isOpen) {
            setSearchTerm("");
            setSelectedLecturerCode("");
            setSelectedLecturerName("");
            setEmail("");
            setSelectedRoles([]);
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (!selectedLecturerCode) {
            notify.error("Vui lòng chọn giảng viên");
            return;
        }
        if (!email) {
            notify.error("Vui lòng nhập email");
            return;
        }
        if (selectedRoles.length === 0) {
            notify.error("Vui lòng chọn ít nhất 1 role");
            return;
        }

        setIsSubmitting(true);
        const res = await registerLecturerAccountApi({
            lecturerId: selectedLecturerCode,
            email,
            roles: selectedRoles
        });
        
        if (res.code === 1) {
            notify.success("Tạo tài khoản thành công!");
            triggerRefresh(); // Refresh the list
            onClose();
        } else {
            notify.error("Lỗi: " + res.message);
        }
        setIsSubmitting(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Tạo tài khoản Giảng viên</DialogTitle>
                    <DialogDescription>
                        Tìm kiếm giảng viên chưa có tài khoản và cấp tài khoản mới.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2 relative">
                        <Label>Tìm kiếm Giảng viên {loadingSearch && <span className="text-muted-foreground text-xs">(Đang tải...)</span>}</Label>
                        
                        {!selectedLecturerCode ? (
                            <>
                                <Input 
                                    placeholder="Nhập tên hoặc mã giảng viên..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                />
                                {lecturers.length > 0 && isFocused && (
                                    <div 
                                        className="absolute top-[70px] left-0 w-full bg-popover text-popover-foreground border rounded-md shadow-md z-50 max-h-48 overflow-y-auto"
                                        onMouseDown={(e) => e.preventDefault()} // Ngăn Input mất focus khi click vào item
                                    >
                                        {lecturers.map(l => (
                                            <div 
                                                key={l.code} 
                                                className="px-3 py-2 text-sm hover:bg-muted cursor-pointer flex justify-between items-center"
                                                onClick={() => {
                                                    setSelectedLecturerCode(l.code);
                                                    setSelectedLecturerName(l.name);
                                                    setSearchTerm("");
                                                    setIsFocused(false);
                                                }}
                                            >
                                                <span className="font-medium">{l.name}</span>
                                                <span className="text-muted-foreground text-xs">{l.code}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex items-center justify-between p-3 mt-1 bg-muted/30 rounded-md border border-input">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{selectedLecturerName}</span>
                                    <Badge variant="secondary" className="text-xs font-normal">{selectedLecturerCode}</Badge>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive" 
                                    onClick={() => setSelectedLecturerCode("")}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label>Email đăng nhập</Label>
                        <Input 
                            type="email"
                            placeholder="email@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Vai trò (Roles) <span className="text-destructive">*</span></Label>
                        <div className="flex flex-col gap-2 mt-1">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                    checked={selectedRoles.includes(Role.MANAGER)}
                                    onChange={() => toggleRole(Role.MANAGER)}
                                />
                                Quản lý (Manager)
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                    checked={selectedRoles.includes(Role.LECTURER)}
                                    onChange={() => toggleRole(Role.LECTURER)}
                                />
                                Giảng viên (Lecturer)
                            </label>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Hủy</Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Đang xử lý..." : "Tạo tài khoản"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
