import { Role } from "@/Authen/auth-type";
//import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export {
    hasAnyRequiredRole,
    getRolesFromToken,//getRolesFromTokenSync,
    verifyToken, hasRequiredRolesAsync
}

function hasAnyRequiredRole(userRoles: Role[], requiredRoles: Role[]): boolean {
    return requiredRoles.some(r =>
        userRoles.map(ur => ur.toLowerCase()).includes(r.toLowerCase())
    );
}

// async function getRolesFromTokenSync(token: string): Promise<Role[] | -1> {
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

//     try {
//         const { payload } = await jwtVerify(token, secret);

//         const raw =
//             payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
//             payload.roles ??
//             payload.role ??
//             [];

//         const roles = (Array.isArray(raw) ? raw : [raw]) as Role[];

//         return roles;
//     } catch {
//         return -1;
//     }
// }


// async function verifyToken(accessToken: string): Promise<boolean> {
//     if (!accessToken) return false;

//     const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

//     try {
//         await jwtVerify(accessToken, secret);
//         return true;
//     } catch {
//         return false;
//     }
// }


async function hasRequiredRolesAsync(requiredRoles: Role[]): Promise<boolean> {
    const cookieStore = await cookies();
    const ACCESS_TOKEN_COOKIE_NAME =
        process.env.NEXT_PUBLIC_NAME_ACCESS_TOKEN ?? "";
    const token = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

    //const thudangco = token ? await getRolesFromTokenSync(token) : [];
    const thudangco = token ? getRolesFromToken(token) : [];
    if (thudangco === -1) return false;

    return hasAnyRequiredRole(thudangco, requiredRoles)

}

function getPayloadFromToken(token: string) {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload;
    } catch {
        return null;
    }
}

function getRolesFromToken(token: string): Role[] | -1 {
    const payload = getPayloadFromToken(token);
    if (!payload) return -1;

    // Kiểm tra hết hạn
    if (payload.exp && Date.now() / 1000 > payload.exp) return -1;

    const raw =
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
        payload.roles ??
        payload.role ??
        [];

    return Array.isArray(raw) ? raw : [raw];
}

function verifyToken(accessToken: string): boolean {
    if (!accessToken) return false;

    const payload = getPayloadFromToken(accessToken);
    if (!payload) return false;

    const now = Date.now() / 1000;

    // exp: hết hạn
    if (payload.exp && now > payload.exp) return false;
    // nbf: chưa có hiệu lực
    if (payload.nbf && now < payload.nbf) return false;

    return true;
}