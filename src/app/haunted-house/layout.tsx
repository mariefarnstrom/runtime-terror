import { redirect } from "next/navigation";
import HauntedHouseShell from "@/components/rooms/HauntedHouseShell";
import { checkAccessCookie } from "@/lib/cookie";

type HauntedHouseLayoutProps = {
  children: React.ReactNode;
};

export default async function HauntedHouseLayout({ children }: HauntedHouseLayoutProps) {
  const accessGranted = await checkAccessCookie();

  if (!accessGranted) {
    redirect("/");
  }

  return <HauntedHouseShell>{children}</HauntedHouseShell>;
}