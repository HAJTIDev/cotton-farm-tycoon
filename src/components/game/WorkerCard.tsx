import { Worker } from "@/types/game";
import { useState } from "react";
import { ShieldCheck, Info } from "lucide-react";

interface WorkerCardProps {
  worker: Worker;
  cost: number;
  canAfford: boolean;
  onBuy: () => void;
}

export const WorkerCard = ({ worker, cost, canAfford, onBuy }: WorkerCardProps) => {
  const [showBhp, setShowBhp] = useState(false);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div
      className={`
        relative p-4 rounded-xl
        bg-gradient-card
        border-2 transition-all duration-200
        ${canAfford 
          ? "border-secondary/50 hover:border-secondary hover:shadow-card cursor-pointer hover:scale-[1.02]" 
          : "border-border/50 opacity-60 cursor-not-allowed"
        }
      `}
      onClick={canAfford ? onBuy : undefined}
    >
      {/* BHP Badge */}
      {worker.bhpCompliant && (
        <div 
          className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full p-1.5 shadow-soft cursor-help"
          onMouseEnter={() => setShowBhp(true)}
          onMouseLeave={() => setShowBhp(false)}
          onClick={(e) => e.stopPropagation()}
        >
          <ShieldCheck className="w-4 h-4" />
        </div>
      )}

      {/* BHP Tooltip */}
      {showBhp && (
        <div className="absolute right-0 top-8 z-20 w-48 p-3 bg-popover border border-border rounded-lg shadow-card animate-slide-up">
          <p className="font-display font-semibold text-sm text-secondary mb-2 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Zgodne z BHP
          </p>
          <ul className="text-xs text-muted-foreground space-y-1">
            {worker.bhpFeatures.map((feature, i) => (
              <li key={i} className="flex items-center gap-1">
                <span className="text-secondary">✓</span> {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="text-4xl w-14 h-14 flex items-center justify-center bg-muted rounded-xl">
          {worker.icon}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-semibold text-foreground truncate">
              {worker.name}
            </h3>
            <span className="bg-muted text-muted-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              {worker.owned}
            </span>
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {worker.description}
          </p>
          <p className="text-xs text-secondary font-semibold mt-1">
            +{worker.cottonPerSecond}/s każdy
          </p>
        </div>

        {/* Cost */}
        <div className={`
          text-right px-3 py-2 rounded-lg font-display font-bold
          ${canAfford 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted text-muted-foreground"
          }
        `}>
          <span className="text-sm block">{formatNumber(cost)}</span>
          <span className="text-xs opacity-80">beli</span>
        </div>
      </div>
    </div>
  );
};
