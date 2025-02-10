import { useState, useCallback } from "react";
import Wheel from "../components/Wheel";
import { Button } from "@/components/ui/button";

const TOTAL_SPINS = 5;

export default function SpinTheWheel() {
  const [spinning, setSpinning] = useState(false);
  const [score, setScore] = useState(0);
  const [spins, setSpins] = useState<number[]>([]);
  const [totalScore, setTotalScore] = useState(0);

  const handleSpin = useCallback(() => {
    if (spins.length < TOTAL_SPINS && !spinning) {
      setSpinning(true);
    }
  }, [spins, spinning]);

  const handleSpinComplete = useCallback((newScore: number) => {
    setScore(newScore);
    setSpins((prevSpins) => {
      const newSpins = [...prevSpins, newScore];
      setTotalScore(newSpins.reduce((sum, spin) => sum + spin, 0));
      return newSpins;
    });
    setSpinning(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Spin the Wheel</h1>
      <div className="mb-4">
        <Wheel spinning={spinning} onSpinComplete={handleSpinComplete} />
      </div>
      <Button
        onClick={handleSpin}
        disabled={spinning || spins.length >= TOTAL_SPINS}
        className="mb-4"
      >
        {spinning ? "Spinning..." : "Spin"}
      </Button>
      <div className="text-xl mb-2">Current Score: {score}</div>
      <div className="text-xl mb-4">Total Score: {totalScore}</div>
      <div className="text-lg">Spins History: {spins.join(", ")}</div>
      <div className="text-lg mt-2">
        Spins Left: {TOTAL_SPINS - spins.length}
      </div>
    </div>
  );
}
