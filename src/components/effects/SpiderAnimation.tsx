import { useState, useEffect } from "react";
import styles from "./SpiderAnimation.module.css";

export default function SpiderAnimation() {
    const [frame, setFrame] = useState(0);

    /* 4x4 sprite sheet animation (1024x1024), each frame is 256x256. We cycle through 16 frames and shift background-position to display the correct frame. */
    const frameSize = 256;
    const cols = 4;

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame((prev) => (prev + 1) % 16);
        }, 20);

        return () => clearInterval(interval);
    }, []);

    const x = (frame % cols) * frameSize;
    const y = Math.floor(frame / cols) * frameSize;

    return (
        <div className={styles.spiderWrap}>
            <div className={styles.spiderScale}>
                <div
                    className={styles.spider}
                    style={{
                        backgroundPosition: `-${x}px -${y}px`,
                    }}
                />
                <div
                    className={styles.spiderShadow}
                    style={{
                        backgroundPosition: `-${x}px -${y}px`,
                    }}
                />
            </div>
        </div>
    );
}