import { NextRequest, NextResponse } from "next/server";
import { processPayment } from "@/lib/payment";
import { setAccessCookie } from "@/lib/cookie";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const transaction = await req.json();
        const result = await processPayment(transaction);

        // Handle successful payment
        if (result.success) {
            await setAccessCookie();
            return NextResponse.json(result, { status: 200 });
        }

        // Handle payment errors with appropriate status codes
        if (result.error?.status === 401) {
            return NextResponse.json(result, { status: 401 });
        }

        if (result.error?.status === 402) {
            return NextResponse.json(result, { status: 402 });
        }

        // Generic payment failure
        return NextResponse.json(result, { status: 400 });
    } catch (error) {
        console.error("Error processing transaction:", error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    message: "Internal Server Error",
                    status: 500,
                },
            },
            { status: 500 }
        );
    }
}


