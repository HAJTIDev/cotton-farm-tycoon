import { useGame } from "@/hooks/useGame";
import { CottonButton } from "@/components/game/CottonButton";
import { StatsDisplay } from "@/components/game/StatsDisplay";
import { WorkerShop } from "@/components/game/WorkerShop";
import { GameHeader } from "@/components/game/GameHeader";

const Index = () => {
  const {
    gameState,
    floatingNumbers,
    isClicking,
    handleClick,
    getWorkerCost,
    buyWorker,
    resetGame,
  } = useGame();

  return (
    <div className="min-h-screen bg-gradient-sky flex flex-col">
      <GameHeader onReset={resetGame} />

      <main className="flex-1 container max-w-6xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 h-full">
          {/* Left side - Clicker */}
          <div className="flex flex-col items-center justify-center space-y-8 py-8">
            {/* Stats */}
            <StatsDisplay gameState={gameState} />

            {/* Cotton Button */}
            <div className="py-8">
              <CottonButton
                onClick={handleClick}
                isClicking={isClicking}
                floatingNumbers={floatingNumbers}
              />
            </div>

            {/* Field decoration */}
            <div className="w-full max-w-sm h-24 bg-gradient-field rounded-t-3xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-end justify-around pb-2">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="text-2xl animate-float"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    🌿
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Shop */}
          <div className="flex flex-col">
            <WorkerShop
              workers={gameState.workers}
              cotton={gameState.cotton}
              getWorkerCost={getWorkerCost}
              onBuy={buyWorker}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-muted-foreground bg-card/40">
        <p className="flex items-center justify-center gap-2">
          <span>🛡️</span>
          Wszystkie operacje prowadzone zgodnie z przepisami BHP
          <span>🛡️</span>
        </p>
      </footer>
    </div>
  );
};

export default Index;
