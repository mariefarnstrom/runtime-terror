'use client'
import { useAmbientSound } from '@/hooks/useAmbientSound'
import Image from 'next/image'
import Link from 'next/link'

type HauntedHouseLayoutProps = {
  children: React.ReactNode
}


export default function HauntedHouseLayout({ children }: HauntedHouseLayoutProps) {
  // Manage ambient sound across all rooms
  useAmbientSound();

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden position-relative">
      
      {children}

      <Link
        href="/"
        aria-label="Exit haunted house"
        className="absolute z-50 bottom-4 right-4 md:bottom-8 md:right-8 rounded-4xl focus-visible:outline-2 focus-visible:outline-red-500 focus-visible:outline-offset-4"
      >
        <Image
          src="/assets/icons/exitSVG.svg"
          alt="Exit"
          width={100}
          height={100}
          className="block"
        />
      </Link>
    </div>
  )
}