'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { searchNoAccountLecturersApi, LecturerNoAccountDto } from "@/working-admin/lecturer/lecturer-admin-service";
import { notify } from "@/_components/utils/Notify";
import { useDebounce } from "@/_components/query/search-Box-state";
import { Badge } from "@/_components/ui/badge";
import { X } from "lucide-react";
import { AccountItemDto } from "@/working-admin/account/account-admin-type";
import { linkLecturerAction } from "@/working-admin/account/account-admin-hook";

interface DialogLinkLecturerProps {
    isOpen: boolean;
    onClose: () => void;
    account: AccountItemDto | null;
}

export default function DialogLinkLecturer({ isOpen, onClose, account }: DialogLinkLecturerProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 300);
    const [lecturers, setLecturers] = useState<LecturerNoAccountDto[]>([]);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    
    // Lưu ý: the API cần lecturerId, LecturerNoAccountDto có trả về id và code.
    const [selectedLecturerId, setSelectedLecturerId] = useState<string>("");
    const [selectedLecturerCode, setSelectedLecturerCode] = useState<string>("");
    const [selectedLecturerName, setSelectedLecturerName] = useState<string>("");
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch lecturers
    useEffect(() => {
        if (!isOpen) return;
        let isMounted = true;
        
        const fetchLecturers = async () => {
            setLoadingSearch(true);
            const res = await searchNoAccountLecturersApi(debouncedSearch);
            if (isMounted) {
                if (res.code === 1) {
                    setLecturers(res.data || []);
                }
                setLoadingSearch(false);
            }
        };
        
        fetchLecturers();
        
        return () => { isMounted = false; };
    }, [debouncedSearch, isOpen]);

    // Handle close and reset state
    const handleClose = () => {
        setSearchTerm("");
        setSelectedLecturerId("");
        setSelectedLecturerCode("");
        setSelectedLecturerName("");
        onClose();
    };

    const handleSubmit = async () => {
        if (!account) return;
        if (!selectedLecturerId) {
            notify.error("Vui lòng chọn giảng viên");
            return;
        }

        setIsSubmitting(true);
        const success = await linkLecturerAction(account.accountId, selectedLecturerId);
        
        if (success) {
            handleClose();
        }
        setIsSubmitting(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Liên kết Giảng viên</DialogTitle>
                    <DialogDescription>
                        Liên kết tài khoản <strong>{account?.email}</strong> với một hồ sơ giảng viên.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2 relative">
                        <Label>Tìm kiếm Giảng viên {loadingSearch && <span className="text-muted-foreground text-xs">(Đang tải...)</span>}</Label>
                        
                        {!selectedLecturerId ? (
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
                                                key={l.id} 
                                                className="px-3 py-2 text-sm hover:bg-muted cursor-pointer flex justify-between items-center"
                                                onClick={() => {
                                                    setSelectedLecturerId(l.id);
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
                                    onClick={() => setSelectedLecturerId("")}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>Hủy</Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Đang xử lý..." : "Liên kết"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
