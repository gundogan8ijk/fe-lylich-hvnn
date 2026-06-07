import { getCourseDetailApi, updateCourseNameApi, updateCourseDescribeApi, updateCourseCreditsApi, toggleCourseVisibilityApi, deleteCourseApi } from "./course-manger-service";
import { ApiResponse } from "@/_Common/_types/result-typeConfig";
import { fail } from "@/_lib/response-helper";
import { CourseDetailPublic } from "./course-manger-type";

export async function getCourseDetailAction(courseId: string): Promise<CourseDetailPublic | null> {
    try {
        const res = await getCourseDetailApi(courseId);
        if (res.code === 1 && res.data) {
            return res.data;
        }
        return null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export async function updateCourseNameAction(courseId: string, newName: string): Promise<ApiResponse<null>> {
    try {
        return await updateCourseNameApi(courseId, newName);
    } catch (e) {
        const error = e as Error;
        console.error(error);
        return fail(error.message || 'Lỗi hệ thống');
    }
}

export async function updateCourseDescribeAction(courseId: string, newDescribe: string): Promise<ApiResponse<null>> {
    try {
        return await updateCourseDescribeApi(courseId, newDescribe);
    } catch (e) {
        const error = e as Error;
        console.error(error);
        return fail(error.message || 'Lỗi hệ thống');
    }
}

export async function updateCourseCreditsAction(courseId: string, theory: number, practice: number): Promise<ApiResponse<null>> {
    try {
        return await updateCourseCreditsApi(courseId, theory, practice);
    } catch (e) {
        const error = e as Error;
        console.error(error);
        return fail(error.message || 'Lỗi hệ thống');
    }
}

export async function toggleCourseVisibilityAction(courseId: string): Promise<ApiResponse<null>> {
    try {
        return await toggleCourseVisibilityApi(courseId);
    } catch (e) {
        const error = e as Error;
        console.error(error);
        return fail(error.message || 'Lỗi hệ thống');
    }
}

export async function deleteCourseAction(courseId: string): Promise<ApiResponse<null>> {
    try {
        return await deleteCourseApi(courseId);
    } catch (e) {
        const error = e as Error;
        console.error(error);
        return fail(error.message || 'Lỗi hệ thống');
    }
}
