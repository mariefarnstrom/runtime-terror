import { cookies } from "next/headers";

const ACCESS_COOKIE_OPTIONS = {
    httpOnly: true,
    path: "/haunted-house",
    maxAge: 60 * 60,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
};

export async function setAccessCookie() {
    const cookieStore = await cookies();
    cookieStore.set({
        name: "access_granted",
        value: "true",
        ...ACCESS_COOKIE_OPTIONS,
    });
}

export async function checkAccessCookie() {
    const cookieStore = await cookies();
    const accessCookie = cookieStore.get("access_granted");
    return accessCookie?.value === "true";
}

export async function clearAccessCookie() {
    const cookieStore = await cookies();
    cookieStore.set({
        name: "access_granted",
        value: "",
        ...ACCESS_COOKIE_OPTIONS,
        maxAge: 0,
    });
}