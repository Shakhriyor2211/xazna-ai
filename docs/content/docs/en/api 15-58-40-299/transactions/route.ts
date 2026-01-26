import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

const DJANGO_BASE_URL = process.env.DJANGO_BASE_URL!;
const TRANSACTION_PATH = "/api/transactions/";

export async function GET(_req: NextRequest): Promise<NextResponse> {
    // 1️⃣ Read incoming browser cookies
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    const cookieHeader: string = allCookies
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

    // 2️⃣ Call Django API (server → server)
    const djangoRes: AxiosResponse = await axios.get(
        `${DJANGO_BASE_URL}${TRANSACTION_PATH}`,
        {
            headers: {
                Cookie: cookieHeader,
            },
            withCredentials: true,
            validateStatus: () => true, // forward all statuses
        }
    );

    // 3️⃣ Create response for browser
    const response = NextResponse.json(djangoRes.data, {
        status: djangoRes.status,
    });

    // 4️⃣ Forward Set-Cookie headers 🔥
    const setCookies = djangoRes.headers["set-cookie"] as
        | string[]
        | undefined;

    if (setCookies) {
        setCookies.forEach((cookie: string) => {
            response.headers.append("Set-Cookie", cookie);
        });
    }

    return response;
}
