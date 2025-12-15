export interface Worker {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  cottonPerSecond: number;
  owned: number;
  icon: string;
  bhpCompliant: boolean;
  bhpFeatures: string[];
}

export interface GameState {
  cotton: number;
  totalCotton: number;
  cottonPerClick: number;
  cottonPerSecond: number;
  workers: Worker[];
  clickMultiplier: number;
}

export interface FloatingNumber {
  id: number;
  value: number;
  x: number;
  y: number;
}
