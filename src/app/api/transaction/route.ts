import { NextRequest, NextResponse } from "next/server";
import { processPayment } from "@/lib/payment";
import { setAccessCookie } from "@/lib/cookie";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const transaction = await req.json();
    const result = await processPayment(transaction);

    if (result.success) {
        await setAccessCookie();
    }

    return NextResponse.json(result);
    
}


