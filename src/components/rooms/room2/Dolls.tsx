import DoorButton from "@/components/shared/DoorTransition";
import { useEffectSounds } from "@/hooks/useEffectSounds";
import RockingChair from "@/components/effects/RockingChair";
import DoorTransition from "@/components/shared/DoorTransition";
import DescriptionButton from "@/components/shared/DescriptionButton";

export default function Dolls() {
  //Example of how to use the useEffectSounds hook
  const trigger = useEffectSounds({ effect: "jumpscare-piano" });

  return (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat
      bg-[url('/assets/images/dolls-bg.jpg')]"
    >
      {/*    <div className="absolute bottom-40 right-140">
        <img src="/assets/images/dolls2.png" alt="" width={200} height={200} />
      </div> */}
      {/* <div className="absolute bottom-35 right-60">
        <img src="/assets/images/doll-head.png" alt="" width={60} height={60} />
      </div> */}
      {/* <div className="absolute bottom-25 left-25">
        <img src="/assets/images/dolls3.png" alt="" width={200} height={200} />
      </div> */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      {/* <DoorButton buttonText="Enter at own risk" /> */}
      {/* Example of using the useEffectSounds hook to trigger a sound effect on mouseover */}
      {/*   <div
        className="bg-red-600/70 p-4 rounded absolute bottom-20 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onMouseEnter={trigger}
      >
        Mouseover me for a jumpscare sound effect
      </div> */}
      <RockingChair />
      {/*  <DollsMove /> */}
      // Spiders — cellar door
      <DoorTransition
        buttonText="Go further"
        doorImage="/assets/images/cellar-door.png"
      />
      <DescriptionButton description="Click on the doll to make it speak. Listen carefully — or you might miss something important." />
    </div>
  );
}
