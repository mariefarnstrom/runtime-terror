import { RoomId } from "@/store/useGameStore";

export type SoundId = 
| 'howling-wind' 
| 'creaks'
| 'synth-ambience'
| 'approaching-ghost'
| 'ghostly-effect'
| 'danger'
| 'creaking-gate'
| 'jumpscare'
| 'jumpscare-piano'

export type SoundKind = "ambient" | "effect";

export type SoundConfig = {
  kind: SoundKind;
  src: string[];
  loop?: boolean;
  volume?: number;
  autoplay?: boolean;
};

export const SOUND_MAP = {
  "howling-wind": {
    kind: "ambient",
    src: ["/assets/audio/ambient/howlingWind.mp3"],
    loop: true,
    volume: 0.5,
    autoplay: true,
  },
  creaks: {
    kind: "ambient",
    src: ["/assets/audio/ambient/creaks.mp3"],
    loop: true,
    volume: 0.5,
    autoplay: true,
  },
  "synth-ambience": {
    kind: "ambient",
    src: ["/assets/audio/ambient/synthAmbiance.mp3"],
    loop: true,
    volume: 0.5,
    autoplay: true,
  },
  "approaching-ghost": {
    kind: "effect",
    src: ["/assets/audio/effect/approachingGhost.ogg"],
    loop: false,
    volume: 0.5,
    autoplay: false,
  },
  "ghostly-effect": {
    kind: "effect",
    src: ["/assets/audio/effect/ghostEffect.mp3"],
    loop: false,
    volume: 0.5,
    autoplay: false,
  },
  danger: {
    kind: "effect",
    src: ["/assets/audio/effect/dangerEffect.mp3"],
    loop: true,
    volume: 0.5,
    autoplay: true,
  },
  "creaking-gate": {
    kind: "effect",
    src: ["/assets/audio/effect/gateCreaking.mp3"],
    loop: false,
    volume: 0.5,
    autoplay: false,
  },
  jumpscare: {
    kind: "effect",
    src: ["/assets/audio/effect/jumpscare.mp3"],
    loop: false,
    volume: 0.7,
    autoplay: false,
  },
  "jumpscare-piano": {
    kind: "effect",
    src: ["/assets/audio/effect/jumpscarePiano.mp3"],
    loop: false,
    volume: 0.5,
    autoplay: false,
  },
} as const satisfies Record<SoundId, SoundConfig>;

export type EffectSoundId = {
  [K in keyof typeof SOUND_MAP]: (typeof SOUND_MAP)[K]["kind"] extends "effect" ? K : never;
}[keyof typeof SOUND_MAP];

export const ROOM_AMBIENT: Record<RoomId, SoundId> = {
  graveyard: "howling-wind",
  dolls: "creaks",
  spiders: "howling-wind",
  clown: "synth-ambience",
};
