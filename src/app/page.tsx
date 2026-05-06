import EnterForm from "@/components/home-page/enter-form";
import Fog from "@/components/effects/Fog";

export default function Home() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background — lowest layer */}
      <div className="absolute inset-0 bg-[url('/assets/images/Home-bg.png')] bg-cover" />

      {/* Fog — above background */}
      <Fog />

      {/* Content — top layer */}
      <div className="relative z-10 flex flex-col w-full items-center">
        <h1 className="text-red-800 text-5xl ">Runtime terror</h1>
        <EnterForm />
      </div>
    </div>
  );
}
