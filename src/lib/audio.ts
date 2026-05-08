import { RoomId } from "@/lib/rooms";

export type SoundId = 'howling-wind' | 'creaks'

export type SoundConfig = {
  src: string[]
  loop?: boolean
  volume?: number
  autoplay?: boolean
}

export const SOUND_MAP: Record<SoundId, SoundConfig> = {
  'howling-wind': {
    src: ['/sounds/howling-wind.mp3'],
    loop: true,
    volume: 0.5,
    autoplay: true,
    },
    'creaks': {
    src: ['/sounds/creaks.mp3'],
    loop: true,
    volume: 0.5,
    autoplay: true,
  },
}

export const ROOM_AMBIENT: Record<RoomId, SoundId> = {
  graveyard:  'howling-wind',
  dolls:    'creaks',
  spiders:  'howling-wind',
  clown: 'howling-wind',
}