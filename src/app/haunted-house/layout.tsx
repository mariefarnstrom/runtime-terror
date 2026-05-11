'use client'
import { useAmbientSound } from '@/hooks/useAmbientSound'

type HauntedHouseLayoutProps = {
  children: React.ReactNode
}

const fearLevel = 40;

export default function HauntedHouseLayout({ children }: HauntedHouseLayoutProps) {
  // Manage ambient sound across all rooms
  useAmbientSound();

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden position-relative">

      <div className='absolute w-full h-full top-0 left-0 p-6 z-5 flex flex-col justify-between items-end-safe pointer-events-none'>
        <div className='bg-gray-600/60 border-4 h-10 w-full max-w-2xl mx-auto'>
          <div className='bg-red-700 h-full'
          style={{ width: `${fearLevel}%` }}></div>
        </div>
        <div>
          <button className='bg-red-700 px-4 py-2 rounded pointer-events-auto cursor-pointer' 
          onClick={() => window.location.href = '/'}>
            Exit
          </button>
        </div>

      </div>

      {children}
    </div>
  )
}