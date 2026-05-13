"use client"
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

type UrlParams = {
  identityToken: string | null
};

export function useUrlParams(): UrlParams {
  const searchParams = useSearchParams();
  const identityToken = searchParams.get("identity_token");

  useEffect(() => {
    if (identityToken) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [identityToken]);

  return {
    identityToken,
  };
}