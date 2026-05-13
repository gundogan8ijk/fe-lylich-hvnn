import { refreshTokenApi } from "@/services/auth-service";

const refreshLocks = new Map<string, Promise<boolean>>();

export async function refreshAccessTokenAction(refreshToken: string): Promise<boolean> {
    const existing = refreshLocks.get(refreshToken);
    if (existing) return existing;

    const promise = (async (): Promise<boolean> => {
        try {
            const res = await refreshTokenApi();
            return res.code === 1;
        } finally {
            refreshLocks.delete(refreshToken);
        }

    })();

    refreshLocks.set(refreshToken, promise);
    return promise;
}
