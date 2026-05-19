// lib/payment.ts
import { ApiResult } from '@/lib/fetcher'
import { Transaction, PaymentResult } from '@/types/index'
import { parseError } from '@/lib/parseError'

export async function processPayment(
  payload: Transaction
): Promise<ApiResult<PaymentResult>> {
  try {
    const res = await fetch('https://api-main-7fe2.up.railway.app/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        error: { message: data.message ?? 'Payment failed', status: res.status },
      }
    }

    return { success: true, data }

  } catch (error: unknown) {
    return { success: false, error: parseError(error) }
  }
}
