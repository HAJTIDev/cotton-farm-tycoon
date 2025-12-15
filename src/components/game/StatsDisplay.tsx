import { GameState } from "@/types/game";

interface StatsDisplayProps {
  gameState: GameState;
}

export const StatsDisplay = ({ gameState }: StatsDisplayProps) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return Math.floor(num).toString();
  };

  return (
    <div className="text-center space-y-2">
      {/* Main counter */}
      <div className="relative">
        <h1 className="font-display text-6xl md:text-7xl font-bold text-foreground">
          {formatNumber(gameState.cotton)}
        </h1>
        <p className="font-display text-xl text-muted-foreground mt-1">
          beli bawełny
        </p>
      </div>

      {/* Per second */}
      <div className="flex items-center justify-center gap-2 text-muted-foreground">
        <span className="text-lg">⚡</span>
        <p className="font-body text-lg">
          <span className="font-semibold text-secondary">{gameState.cottonPerSecond.toFixed(1)}</span>
          {" "}na sekundę
        </p>
      </div>

      {/* Total collected */}
      <div className="text-sm text-muted-foreground/70">
        Zebrano łącznie: {formatNumber(gameState.totalCotton)}
      </div>
    </div>
  );
};
