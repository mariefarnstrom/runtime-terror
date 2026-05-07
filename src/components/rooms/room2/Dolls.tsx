import DoorButton from "@/components/shared/Button";

export default function Dolls() {

  return (
    <div className="absolute inset-0 bg-[url('/assets/images/creepy-doll.jpg')] bg-cover">
      <DoorButton buttonText="Enter at own risk" />
    </div>
  );
}