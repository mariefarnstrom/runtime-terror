'use client'
import { useAmbientSound } from '@/hooks/useAmbientSound'

type HauntedHouseLayoutProps = {
  children: React.ReactNode
}

export default function HauntedHouseLayout({ children }: HauntedHouseLayoutProps) {
  useAmbientSound()

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {children}
    </div>
  )
}