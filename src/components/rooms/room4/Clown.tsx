import DoorButton from "@/components/shared/DoorTransition";

export default function Clown() {
  return (
    <div className="absolute inset-0 bg-[url('/assets/images/clown.png')] bg-cover">
      <DoorButton buttonText="Exit house" />
    </div>
  );
}
