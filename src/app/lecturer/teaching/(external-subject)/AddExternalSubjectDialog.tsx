"use client";
import { useTeachingStore } from "@/Teaching-Lecturer/Teaching-Lecturer-store";
import { useTeachingActions } from "@/Teaching-Lecturer/Teaching-Lecturer-hook";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddExternalSubjectDialog({ isOpen, onClose }: Props) {
    const { isSubmitting } = useTeachingStore();
    const { addExternalCourse } = useTeachingActions();
    const [name, setName] = useState("");

    const handleAdd = async () => {
        if (!name.trim()) return;
        const success = await addExternalCourse(name.trim());
        if (success) {
            setName("");
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm môn giảng dạy bên ngoài</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Input 
                        placeholder="Nhập tên môn học" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isSubmitting}>Hủy</Button>
                    <Button onClick={handleAdd} disabled={!name.trim() || isSubmitting}>Lưu</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
