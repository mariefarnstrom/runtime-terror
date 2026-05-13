import { Suspense } from "react";
import HomeClient from "@/components/home-page/home-client";

export default function Home() {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-black" />}>
      <HomeClient />
    </Suspense>
  );
}
