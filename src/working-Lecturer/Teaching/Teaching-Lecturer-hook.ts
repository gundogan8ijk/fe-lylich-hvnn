import { useCallback, useEffect } from "react";
import { useTeachingStore } from "./Teaching-Lecturer-store";
import { 
    getTeachingDetailApi, 
    getDisciplineCoursesApi, 
    addInternalCourseApi, 
    removeInternalCourseApi, 
    addExternalCourseApi, 
    removeExternalCourseApi 
} from "./Teaching-Lecturer-ser";
import { notify } from "@/_components/utils/Notify";

export const useTeachingActions = () => {
    const { 
        setData, 
        setDisciplineCourses, 
        setIsLoading, 
        setIsSubmitting 
    } = useTeachingStore();

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const detailRes = await getTeachingDetailApi();
            
            if (detailRes.code === 1) {
                setData(detailRes.data);
            } else {
                notify.error(detailRes.message || "Lỗi tải thông tin giảng dạy");
            }
        } finally {
            setIsLoading(false);
        }
    }, [setData, setIsLoading]);

    const fetchDisciplineCourses = useCallback(async () => {
        const coursesRes = await getDisciplineCoursesApi();
        if (coursesRes.code === 1 &&  coursesRes.data) {
            setDisciplineCourses(coursesRes.data);
        } else {
            notify.error(coursesRes.message || "Lỗi tải danh sách môn chuyên ngành");
        }
    }, [setDisciplineCourses]);

    const addInternalCourse = async (courseId: string) => {
        setIsSubmitting(true);
        try {
            const res = await addInternalCourseApi(courseId);
            if (res.code === 1) {
                notify.success("Thêm môn học thành công");
                await fetchData();
                return true;
            }
            notify.error(res.message || "Thêm môn học thất bại");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const removeInternalCourse = async (courseId: string) => {
        setIsSubmitting(true);
        try {
            const res = await removeInternalCourseApi(courseId);
            if (res.code === 1) {
                notify.success("Xóa môn học thành công");
                await fetchData();
                return true;
            }
            notify.error(res.message || "Xóa môn học thất bại");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const addExternalCourse = async (disciplineName: string) => {
        setIsSubmitting(true);
        try {
            const res = await addExternalCourseApi(disciplineName);
            if (res.code === 1) {
                notify.success("Thêm môn giảng dạy ngoài thành công");
                await fetchData();
                return true;
            }
            notify.error(res.message || "Thêm môn giảng dạy ngoài thất bại");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const removeExternalCourse = async (externalSubjectId: string) => {
        setIsSubmitting(true);
        try {
            const res = await removeExternalCourseApi(externalSubjectId);
            if (res.code === 1) {
                notify.success("Xóa môn giảng dạy ngoài thành công");
                await fetchData();
                return true;
            }
            notify.error(res.message || "Xóa môn giảng dạy ngoài thất bại");
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        fetchData,
        fetchDisciplineCourses,
        addInternalCourse,
        removeInternalCourse,
        addExternalCourse,
        removeExternalCourse
    };
};

export const useTeachingSetup = () => {
    const { fetchData } = useTeachingActions();

    useEffect(() => {
        fetchData();
    }, [fetchData]);
};
