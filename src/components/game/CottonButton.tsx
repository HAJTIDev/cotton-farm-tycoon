import { FloatingNumber } from "@/types/game";
import { MouseEvent } from "react";

interface CottonButtonProps {
  onClick: (x: number, y: number) => void;
  isClicking: boolean;
  floatingNumbers: FloatingNumber[];
}

export const CottonButton = ({ onClick, isClicking, floatingNumbers }: CottonButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    onClick(x, y);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Floating numbers */}
      {floatingNumbers.map((num) => (
        <div
          key={num.id}
          className="absolute pointer-events-none font-display font-bold text-2xl text-gold animate-cotton-pop z-10"
          style={{ left: num.x, top: num.y }}
        >
          +{num.value}
        </div>
      ))}

      {/* Glow effect */}
      <div className="absolute w-52 h-52 rounded-full bg-cotton-glow/30 animate-pulse-glow blur-xl" />

      {/* Main button */}
      <button
        onClick={handleClick}
        className={`
          relative w-48 h-48 rounded-full 
          bg-gradient-cotton
          shadow-glow
          border-4 border-cotton-glow/50
          flex items-center justify-center
          transition-all duration-150
          hover:scale-105 hover:shadow-[0_0_50px_hsl(45_80%_70%/0.7)]
          active:scale-95
          cursor-pointer select-none
          ${isClicking ? "animate-bounce-click" : ""}
        `}
      >
        {/* Cotton texture */}
        <div className="absolute inset-4 rounded-full bg-cotton opacity-80" />
        
        {/* Cotton puffs */}
        <div className="relative text-7xl animate-float">
          ☁️
        </div>

        {/* Shine effect */}
        <div className="absolute top-4 left-8 w-8 h-8 rounded-full bg-white/40 blur-sm" />
      </button>

      {/* Click instruction */}
      <p className="absolute -bottom-8 text-muted-foreground text-sm font-body">
        Kliknij, aby zebrać bawełnę!
      </p>
    </div>
  );
};
