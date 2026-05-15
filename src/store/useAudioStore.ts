import { create } from "zustand";
import { Howl, Howler } from "howler";
import { SoundId, SOUND_MAP } from "@/lib/audio";

type HowlInstance = {
  id?: number;
  howl: Howl;
};

//Defining the shape of our audio store
type AudioStore = {
  instances: Partial<Record<SoundId, HowlInstance>>
  currentAmbient: SoundId | null
  isMuted: boolean
  masterVolume: number

  load: (soundId: SoundId) => void
  play: (soundId: SoundId) => void
  stop: (soundId: SoundId) => void
  fadeIn: (soundId: SoundId, duration?: number) => void
  fadeOut: (soundId: SoundId, duration?: number) => void
  crossfade: (from: SoundId | null, to: SoundId, duration?: number) => void
  setMuted: (muted: boolean) => void
  setMasterVolume: (volume: number) => void
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  instances: {},
  currentAmbient: null,
  isMuted: false,
  masterVolume: 1,

  load: (soundId) => {
    const { instances } = get()
    if (instances[soundId]) return   // already loaded

    const config = SOUND_MAP[soundId]
    const howl = new Howl({
      src: config.src,
      loop: config.loop ?? false,
      volume: config.volume ?? 1,
      preload: true,
    })

    set((state) => ({
      instances: { ...state.instances, [soundId]: { howl } },
    }))
  },

  play: (soundId) => {
    const { instances, isMuted, load } = get()
    if (!instances[soundId]) load(soundId)

    const instance = get().instances[soundId]
    if (!instance || isMuted) return

    const id = instance.howl.play()
    set((state) => ({
      instances: { ...state.instances, [soundId]: { ...instance, id } },
    }))
  },

  stop: (soundId) => {
    const { instances } = get()
    instances[soundId]?.howl.stop()
  },

  fadeIn: (soundId, duration = 1000) => {
    const { instances, load, isMuted } = get()
    if (!instances[soundId]) load(soundId)

    const instance = get().instances[soundId]
    if (!instance || isMuted) return

    instance.howl.volume(0)
    const id = instance.howl.play()
    const targetVolume = SOUND_MAP[soundId].volume ?? 1
    instance.howl.fade(0, targetVolume, duration, id)

    set((state) => ({
      instances: { ...state.instances, [soundId]: { ...instance, id } },
    }))
  },

  fadeOut: (soundId, duration = 1000) => {
    const { instances, masterVolume } = get();

    const instance = instances[soundId];

    if (!instance || instance.id === undefined) return;

    const soundIdInstance = instance.id;

    const targetVolume = SOUND_MAP[soundId].volume ?? 1;
    instance.howl.fade(targetVolume, 0, duration, soundIdInstance);

    setTimeout(() => {
      instance.howl.stop(soundIdInstance);

      // Reset volume for next playback
      instance.howl.volume(masterVolume, soundIdInstance);
    }, duration);
  },

  crossfade: (from, to, duration = 1500) => {
    const { fadeOut, fadeIn } = get()
    if (from) fadeOut(from, duration)
    fadeIn(to, duration)
    set({ currentAmbient: to })
  },

  setMuted: (muted) => {
    Howler.mute(muted)
    set({ isMuted: muted })
  },

  setMasterVolume: (volume) => {
    Howler.volume(volume)
    set({ masterVolume: volume })
  },
}))