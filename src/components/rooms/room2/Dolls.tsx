import DoorButton from "@/components/shared/Button";
import { useEffectSounds } from "@/hooks/useEffectSounds";

export default function Dolls() {

  //Example of how to use the useEffectSounds hook
   const trigger = useEffectSounds({ effect: "jumpscare-piano"})

  return (
    <div className="absolute inset-0 bg-[url('/assets/images/creepy-doll.jpg')] bg-cover">
      <DoorButton buttonText="Enter at own risk" />

      {/* Example of using the useEffectSounds hook to trigger a sound effect on mouseover */}
      <div className="bg-red-600/70 p-4 rounded absolute bottom-20 left-1/2 transform -translate-x-1/2 cursor-pointer"
      onMouseEnter={trigger}>
        Mouseover me for a jumpscare sound effect
      </div>
      
    </div>
  );
}