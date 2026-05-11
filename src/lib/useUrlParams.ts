"use client"
import { useSearchParams } from "next/navigation";

type UrlParams = {
  identityToken: string | null
};

export function useUrlParams(): UrlParams {
  const searchParams = useSearchParams();

  return {
    identityToken: searchParams.get("identity_token"),
  }

}