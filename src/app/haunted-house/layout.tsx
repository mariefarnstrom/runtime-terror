import HauntedHouseShell from "@/components/rooms/HauntedHouseShell";

type HauntedHouseLayoutProps = {
  children: React.ReactNode;
};

export default async function HauntedHouseLayout({ children }: HauntedHouseLayoutProps) {

  return (
    <HauntedHouseShell>
      {children}
    </HauntedHouseShell>
  );
}