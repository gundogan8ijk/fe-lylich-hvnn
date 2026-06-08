'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, Search, X } from 'lucide-react';
import { getListDisciplinesNameApi } from '@/working-public/Discipline-Public/disciplines-Public-ser';
import { DisciplinesNameItems } from '@/working-public/Discipline-Public/disciplines-type';
import { storeProjectExternalDetail } from '@/working-Lecturer/ProjectExternal-Detail/ProjectExternal-Detail-store';
import { addDisciplinesAction } from '@/working-Lecturer/ProjectExternal-Detail/ProjectExternal-Detail-hook';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddDisciplineDialog({ isOpen, onClose }: Props) {
    const { data: project } = storeProjectExternalDetail();

    const [selectedList, setSelectedList] = useState<DisciplinesNameItems[]>([]);
    const [disciplineQuery, setDisciplineQuery] = useState('');
    const [disciplineResults, setDisciplineResults] = useState<DisciplinesNameItems[]>([]);
    const [disciplineLoading, setDisciplineLoading] = useState(false);
    const [ddOpen, setDdOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const wrapRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchIdRef = useRef<number>(0);

    const existingDisciplineIds = project?.disciplines.map(d => d.id) ?? [];
    const maxDisciplines = project?.maxDisciplines ?? 5;
    const remainingSlots = maxDisciplines - (project?.disciplines.length ?? 0) - selectedList.length;

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!wrapRef.current?.contains(e.target as Node)) setDdOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    if (!isOpen) return null;

    const searchDisciplines = async (q: string) => {
        setDisciplineLoading(true);
        const id = ++searchIdRef.current;
        try {
            const res = await getListDisciplinesNameApi(q);
            if (id === searchIdRef.current && res.code === 1 && res.data) {
                const filtered = res.data.filter(
                    d => !existingDisciplineIds.includes(d.id) && !selectedList.some(s => s.id === d.id)
                );
                setDisciplineResults(filtered);
            }
        } finally {
            if (id === searchIdRef.current) setDisciplineLoading(false);
        }
    };

    const handleInput = (q: string) => {
        setDisciplineQuery(q);
        setDdOpen(true);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => searchDisciplines(q), 400);
    };

    const addDiscipline = (discipline: DisciplinesNameItems) => {
        if (remainingSlots <= 0) return;
        setSelectedList([...selectedList, discipline]);
        setDisciplineQuery('');
        setDisciplineResults([]);
        setDdOpen(false);
    };

    const removeSelected = (id: string) => {
        setSelectedList(selectedList.filter(d => d.id !== id));
    };

    const clearAll = () => {
        setSelectedList([]);
        setDisciplineQuery('');
        setDisciplineResults([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedList.length === 0) return;
        if (!project?.id) return;

        setLoading(true);
        try {
            const ids = selectedList.map(d => d.id);
            const success = await addDisciplinesAction(project.id, ids);
            if (success) {
                clearAll();
                onClose();
            }
        } catch (error) {
            console.error('Lỗi thêm lĩnh vực:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-background rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-border animate-in zoom-in-95 duration-150">
                <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex justify-between items-center z-10">
                    <h3 className="text-base font-semibold text-foreground">Thêm lĩnh vực nghiên cứu</h3>
                    <button type="button" onClick={onClose} disabled={loading}
                        className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="text-xs text-muted-foreground flex justify-between items-center">
                        <span>Đã chọn: {selectedList.length}</span>
                        <span>Còn có thể thêm: {remainingSlots}</span>
                    </div>

                    {selectedList.length > 0 && (
                        <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-muted/20">
                            {selectedList.map(d => (
                                <div key={d.id} className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                                    <span>{d.code} - {d.name}</span>
                                    <button type="button" onClick={() => removeSelected(d.id)} className="hover:text-destructive">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="space-y-1.5" ref={wrapRef}>
                        <label className="block text-sm font-semibold text-foreground">Tìm lĩnh vực</label>
                        <div className="relative">
                            <div className="flex min-h-9 items-center gap-1.5 rounded-md border border-border px-3 py-1.5 focus-within:ring-2 focus-within:ring-primary/50">
                                <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                <input
                                    className="flex-1 bg-transparent text-sm outline-none"
                                    placeholder="Nhập mã hoặc tên lĩnh vực..."
                                    value={disciplineQuery}
                                    onChange={(e) => handleInput(e.target.value)}
                                    onFocus={() => { setDdOpen(true); searchDisciplines(disciplineQuery); }}
                                    onKeyDown={(e) => { if (e.key === 'Escape') setDdOpen(false); }}
                                    disabled={remainingSlots <= 0}
                                />
                            </div>
                            {ddOpen && remainingSlots > 0 && (
                                <div className="absolute z-50 mt-1 max-h-56 w-full overflow-y-auto rounded-md border bg-popover shadow-md">
                                    {disciplineLoading ? (
                                        <div className="flex items-center gap-2 px-3 py-2.5 text-xs text-muted-foreground">
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Đang tìm kiếm...
                                        </div>
                                    ) : disciplineResults.length === 0 ? (
                                        <p className="px-3 py-2.5 text-xs text-muted-foreground">Không tìm thấy hoặc đã có trong đề tài</p>
                                    ) : (
                                        disciplineResults.map((d) => (
                                            <button
                                                key={d.id}
                                                type="button"
                                                onClick={() => addDiscipline(d)}
                                                className="flex w-full items-baseline gap-2 px-3 py-2 text-left text-sm hover:bg-accent"
                                            >
                                                <span className="font-mono text-xs text-muted-foreground">{d.code}</span>
                                                <span className="text-muted-foreground/40">·</span>
                                                <span className="truncate">{d.name}</span>
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                        <button
                            type="submit"
                            disabled={loading || selectedList.length === 0}
                            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : `Thêm ${selectedList.length} lĩnh vực`}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-muted rounded-lg"
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}