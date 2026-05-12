/**
 * Game configuration based on mode (standalone or tivoli)
 * Control which mode via NEXT_PUBLIC_TIVOLI_MODE env variable
 */

export const TIVOLI_MODE = process.env.NEXT_PUBLIC_TIVOLI_MODE === "true";

