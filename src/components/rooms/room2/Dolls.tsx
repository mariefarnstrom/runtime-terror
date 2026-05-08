import DoorButton from "@/components/shared/Button";
import RockingChair from "@/components/effects/RockingChair";

export default function Dolls() {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat
      bg-[url('/assets/images/dolls-bg.png')]"
    >
      <div className="absolute inset-0 bg-black/20" />

      <DoorButton buttonText="Enter at own risk" />

      <RockingChair />
    </div>
  );
}
