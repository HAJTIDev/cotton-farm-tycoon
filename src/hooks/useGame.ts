import { useState, useEffect, useCallback } from "react";
import { GameState, Worker, FloatingNumber } from "@/types/game";
import { initialWorkers } from "@/data/workers";

const SAVE_KEY = "cotton_clicker_save";

const loadGame = (): GameState => {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        workers: initialWorkers.map((w) => ({
          ...w,
          owned: parsed.workers?.find((pw: Worker) => pw.id === w.id)?.owned || 0,
        })),
      };
    }
  } catch (e) {
    console.error("Failed to load game:", e);
  }
  return {
    cotton: 0,
    totalCotton: 0,
    cottonPerClick: 1,
    cottonPerSecond: 0,
    workers: initialWorkers,
    clickMultiplier: 1,
  };
};

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(loadGame);
  const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumber[]>([]);
  const [isClicking, setIsClicking] = useState(false);

  // Calculate cotton per second
  const calculateCPS = useCallback((workers: Worker[]) => {
    return workers.reduce((total, worker) => {
      return total + worker.cottonPerSecond * worker.owned;
    }, 0);
  }, []);

  // Save game periodically
  useEffect(() => {
    const saveInterval = setInterval(() => {
      localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
    }, 5000);
    return () => clearInterval(saveInterval);
  }, [gameState]);

  // Production tick
  useEffect(() => {
    const tickInterval = setInterval(() => {
      const cps = calculateCPS(gameState.workers);
      if (cps > 0) {
        setGameState((prev) => ({
          ...prev,
          cotton: prev.cotton + cps / 10,
          totalCotton: prev.totalCotton + cps / 10,
          cottonPerSecond: cps,
        }));
      }
    }, 100);
    return () => clearInterval(tickInterval);
  }, [gameState.workers, calculateCPS]);

  // Handle click
  const handleClick = useCallback((x: number, y: number) => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 150);

    const clickValue = gameState.cottonPerClick * gameState.clickMultiplier;

    // Add floating number
    const newFloat: FloatingNumber = {
      id: Date.now() + Math.random(),
      value: clickValue,
      x: x + (Math.random() - 0.5) * 40,
      y: y,
    };
    setFloatingNumbers((prev) => [...prev, newFloat]);
    setTimeout(() => {
      setFloatingNumbers((prev) => prev.filter((f) => f.id !== newFloat.id));
    }, 500);

    setGameState((prev) => ({
      ...prev,
      cotton: prev.cotton + clickValue,
      totalCotton: prev.totalCotton + clickValue,
    }));
  }, [gameState.cottonPerClick, gameState.clickMultiplier]);

  // Calculate worker cost
  const getWorkerCost = useCallback((worker: Worker) => {
    return Math.floor(worker.baseCost * Math.pow(1.15, worker.owned));
  }, []);

  // Buy worker
  const buyWorker = useCallback((workerId: string) => {
    setGameState((prev) => {
      const worker = prev.workers.find((w) => w.id === workerId);
      if (!worker) return prev;

      const cost = Math.floor(worker.baseCost * Math.pow(1.15, worker.owned));
      if (prev.cotton < cost) return prev;

      const newWorkers = prev.workers.map((w) =>
        w.id === workerId ? { ...w, owned: w.owned + 1 } : w
      );

      return {
        ...prev,
        cotton: prev.cotton - cost,
        workers: newWorkers,
        cottonPerSecond: calculateCPS(newWorkers),
      };
    });
  }, [calculateCPS]);

  // Reset game
  const resetGame = useCallback(() => {
    localStorage.removeItem(SAVE_KEY);
    setGameState({
      cotton: 0,
      totalCotton: 0,
      cottonPerClick: 1,
      cottonPerSecond: 0,
      workers: initialWorkers,
      clickMultiplier: 1,
    });
  }, []);

  return {
    gameState,
    floatingNumbers,
    isClicking,
    handleClick,
    getWorkerCost,
    buyWorker,
    resetGame,
  };
};
