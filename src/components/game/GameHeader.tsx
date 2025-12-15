import { RotateCcw, ShieldCheck } from "lucide-react";

interface GameHeaderProps {
  onReset: () => void;
}

export const GameHeader = ({ onReset }: GameHeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 bg-card/60 backdrop-blur-sm border-b border-border">
      <div className="flex items-center gap-3">
        <span className="text-3xl">🌾</span>
        <div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">
            Cotton Clicker
          </h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-secondary" />
            100% zgodne z BHP
          </p>
        </div>
      </div>

      <button
        onClick={onReset}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm
          text-muted-foreground hover:text-destructive hover:bg-destructive/10
          transition-colors"
        title="Resetuj grę"
      >
        <RotateCcw className="w-4 h-4" />
        <span className="hidden md:inline">Reset</span>
      </button>
    </header>
  );
};
