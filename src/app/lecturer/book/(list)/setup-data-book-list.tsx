'use client';

import { getMyBooksAction } from "@/Book-Lecturer-List/Book-List-hook";
import { useEffect } from "react";

export default function SetupDataBookList() {
    useEffect(() => {
        getMyBooksAction();
    }, []);
    return null;
}