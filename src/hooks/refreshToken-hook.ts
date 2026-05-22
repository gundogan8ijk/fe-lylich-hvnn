const refreshLocks = new Map<string, Promise<boolean>>();

export async function refreshAccessTokenAction(refreshToken: string): Promise<boolean> {
    const existing = refreshLocks.get(refreshToken);
    if (existing) return existing;

    const promise = (async (): Promise<boolean> => {
        try {
            await fetch(
                `${process.env.API_URL}/auth/refresh`,
                {
                    method: "POST",
                    headers: {
                        Cookie: `refreshToken=${refreshToken}`
                    }
                }
            );
            return true;
        } catch {
            return false;
        } finally {
            refreshLocks.delete(refreshToken);
        }

    })();

    refreshLocks.set(refreshToken, promise);
    return promise;
}
