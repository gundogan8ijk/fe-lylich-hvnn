'use client'
import { getListArticleLecturerAction } from '@/working-Lecturer/Article-List/Article-Lecturer-hook';
import { useEffect } from "react"

export default function SetupDataArticleList() {
    useEffect(() => {
        getListArticleLecturerAction();
    }, []);

    return <></>;
}