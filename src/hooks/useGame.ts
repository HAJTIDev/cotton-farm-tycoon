import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { FloatingNumber, GameState, Worker } from "../types/game";
import { initialWorkers } from "../data/workers";

const SAVE_KEY = "cotton_clicker_save";

const baseState: GameState = {
  cotton: 0,
  totalCotton: 0,
  cottonPerClick: 1,
  cottonPerSecond: 0,
  workers: initialWorkers,
  clickMultiplier: 1,
};

const hydrateState = (saved: Partial<GameState> | null): GameState => {
  if (!saved) return baseState;
  return {
    ...baseState,
    ...saved,
    workers: initialWorkers.map((worker) => {
      const persisted = saved.workers?.find((w) => w.id === worker.id);
      return {
        ...worker,
        owned: persisted?.owned ?? 0,
      };
    }),
  };
};

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(baseState);
  const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumber[]>([]);
  const [isClicking, setIsClicking] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const calculateCPS = useCallback((workers: Worker[]) => {
    return workers.reduce((total, worker) => total + worker.cottonPerSecond * worker.owned, 0);
  }, []);

  // Load saved game once
  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(SAVE_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        setGameState(hydrateState(parsed));
      } catch (error) {
        console.warn("Failed to load game", error);
      } finally {
        setHydrated(true);
      }
    };

    load();
  }, []);

  // Persist whenever state changes after hydration
  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(SAVE_KEY, JSON.stringify(gameState)).catch((error) => {
      console.warn("Failed to save game", error);
    });
  }, [gameState, hydrated]);

  // Production tick every 100ms
  useEffect(() => {
    const tick = setInterval(() => {
      setGameState((prev) => {
        const cps = calculateCPS(prev.workers);
        if (cps <= 0) {
          return prev.cottonPerSecond === cps ? prev : { ...prev, cottonPerSecond: cps };
        }
        const gain = cps / 10;
        return {
          ...prev,
          cotton: prev.cotton + gain,
          totalCotton: prev.totalCotton + gain,
          cottonPerSecond: cps,
        };
      });
    }, 100);

    return () => clearInterval(tick);
  }, [calculateCPS]);

  const handleClick = useCallback(
    (x: number, y: number) => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 150);

      const clickValue = gameState.cottonPerClick * gameState.clickMultiplier;

      const newFloat: FloatingNumber = {
        id: Date.now() + Math.random(),
        value: clickValue,
        x: x + (Math.random() - 0.5) * 30,
        y,
      };

      setFloatingNumbers((prev) => [...prev, newFloat]);
      setTimeout(() => {
        setFloatingNumbers((prev) => prev.filter((f) => f.id !== newFloat.id));
      }, 600);

      setGameState((prev) => ({
        ...prev,
        cotton: prev.cotton + clickValue,
        totalCotton: prev.totalCotton + clickValue,
      }));
    },
    [gameState.cottonPerClick, gameState.clickMultiplier]
  );

  const getWorkerCost = useCallback((worker: Worker) => {
    return Math.floor(worker.baseCost * Math.pow(1.15, worker.owned));
  }, []);

  const buyWorker = useCallback(
    (workerId: string) => {
      setGameState((prev) => {
        const worker = prev.workers.find((w) => w.id === workerId);
        if (!worker) return prev;

        const cost = Math.floor(worker.baseCost * Math.pow(1.15, worker.owned));
        if (prev.cotton < cost) return prev;

        const newWorkers = prev.workers.map((w) =>
          w.id === workerId ? { ...w, owned: w.owned + 1 } : w
        );

        const cps = calculateCPS(newWorkers);

        return {
          ...prev,
          cotton: prev.cotton - cost,
          workers: newWorkers,
          cottonPerSecond: cps,
        };
      });
    },
    [calculateCPS]
  );

  const resetGame = useCallback(() => {
    AsyncStorage.removeItem(SAVE_KEY).catch(() => undefined);
    setGameState(baseState);
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
