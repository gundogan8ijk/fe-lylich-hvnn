'use client'
import { getListArticleLecturerAction } from "@/Article-Lecturer-List/Article-Lecturer-hook";
import { useEffect } from "react"

export default function SetupDataArticleList() {
    useEffect(() => {
        getListArticleLecturerAction();
    }, []);

    return <></>;
}