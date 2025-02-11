"use client";

import { useState, useEffect } from "react";
import styles from "../styles/Wheel.module.css";

const SLICE_COUNT = 10;

interface WheelProps {
  spinning: boolean;
  onSpinComplete: (score: number) => void;
}

const Wheel: React.FC<WheelProps> = ({ spinning, onSpinComplete }) => {
  const [rotation, setRotation] = useState(0);
  const [winSlice, setWinSlice] = useState(-1);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (spinning) {
      setWinSlice(-1);
      const spinDuration = 8000 + Math.random() * 2000; // 8-10 seconds
      setDuration(spinDuration);
      const totalRotation = rotation + 3600 + Math.floor(Math.random() * 360); // 10+ full rotations

      setRotation(totalRotation);

      const timer = setTimeout(() => {
        let winIndex = Math.floor(
          (360 - (totalRotation % 360)) / (360 / SLICE_COUNT)
        );
        if (winIndex === 0) winIndex = 10;
        onSpinComplete(winIndex * 10);
        setWinSlice(winIndex);
      }, spinDuration);

      return () => clearTimeout(timer);
    }
  }, [spinning, onSpinComplete]);

  return (
    <div className={styles.wheelContainer}>
      <div
        className={`${styles.wheel} ${
          winSlice === -1 ? styles.wheel_bg : styles[`wheel_bg_${winSlice}`]
        }`}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: spinning
            ? `transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`
            : "none",
        }}
      >
        {Array.from({ length: SLICE_COUNT }).map((_, i) => (
          <div
            key={i}
            className={styles.slice}
            style={{ transform: `rotate(${i * (360 / SLICE_COUNT)}deg)` }}
          >
            <span className={styles.text}>{(i + 1) * 10}</span>
          </div>
        ))}
      </div>
      <div className={styles.pointer}></div>
    </div>
  );
};

export default Wheel;
