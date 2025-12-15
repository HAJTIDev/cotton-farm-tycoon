import { Worker } from "@/types/game";
import { WorkerCard } from "./WorkerCard";
import { Users, ShieldCheck } from "lucide-react";

interface WorkerShopProps {
  workers: Worker[];
  cotton: number;
  getWorkerCost: (worker: Worker) => number;
  onBuy: (workerId: string) => void;
}

export const WorkerShop = ({ workers, cotton, getWorkerCost, onBuy }: WorkerShopProps) => {
  const totalWorkers = workers.reduce((sum, w) => sum + w.owned, 0);

  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-card border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="font-display text-xl font-bold text-foreground">
            Zatrudnij Pracowników
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-secondary" />
          <span>Wszyscy zgodni z BHP</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-4 text-sm">
        <div className="bg-muted/50 px-3 py-1.5 rounded-lg">
          <span className="text-muted-foreground">Zatrudnionych: </span>
          <span className="font-bold text-foreground">{totalWorkers}</span>
        </div>
      </div>

      {/* Worker list */}
      <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin">
        {workers.map((worker) => {
          const cost = getWorkerCost(worker);
          const canAfford = cotton >= cost;
          return (
            <WorkerCard
              key={worker.id}
              worker={worker}
              cost={cost}
              canAfford={canAfford}
              onBuy={() => onBuy(worker.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
