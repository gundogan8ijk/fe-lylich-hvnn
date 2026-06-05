'use client';

import { getBookDetailAction } from "@/Book-Lecturer-Detail/Book-Detail-hook";
import { useEffect } from "react";

export default function BookDetailSetupData({ id }: { id: string }) {
    useEffect(() => {
        getBookDetailAction(id);
    }, [id]);
    return null;
}