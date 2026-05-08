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
        <h1 className="font-eater text-red-800 text-5xl leading-normal">
          Runtime terror
        </h1>

        <div className="bg-black(opacity-80)">
          <h2 className="font-glitch">
            Are you a scaredy cat — or do you laugh in the face of horror?
          </h2>
          <h2 className="font-glitch">
            Enter Runtime Terror and find out if you can handle what's inside.
          </h2>
        </div>
        <EnterForm />
      </div>
    </div>
  );
}
