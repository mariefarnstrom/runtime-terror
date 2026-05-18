import styles from "./BatSprite.module.css";

interface BatSpriteProps {
  flapDelay?: number;
}

export default function BatSprite({ flapDelay = 0 }: BatSpriteProps) {
  return (
    <div
      className={styles["bat-sprite"]}
      style={{ animationDelay: `${flapDelay}s` }}
    />
  );
}
