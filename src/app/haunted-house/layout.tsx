import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HauntedHouseShell from "@/components/rooms/HauntedHouseShell";

type HauntedHouseLayoutProps = {
  children: React.ReactNode;
};

export default async function HauntedHouseLayout({ children }: HauntedHouseLayoutProps) {
  const accessGranted = (await cookies()).get("access_granted")?.value === "true";

  if (!accessGranted) {
    redirect("/");
  }

  return <HauntedHouseShell>{children}</HauntedHouseShell>;
}