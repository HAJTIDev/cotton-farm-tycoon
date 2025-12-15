import { StyleSheet, Text, View } from "react-native";
import { Worker } from "../../types/game";
import { WorkerCard } from "./WorkerCard";

interface WorkerShopProps {
  workers: Worker[];
  cotton: number;
  getWorkerCost: (worker: Worker) => number;
  onBuy: (workerId: string) => void;
}

export const WorkerShop = ({ workers, cotton, getWorkerCost, onBuy }: WorkerShopProps) => {
  const totalWorkers = workers.reduce((sum, w) => sum + w.owned, 0);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Zatrudnij Pracowników</Text>
        <Text style={styles.subtle}>Wszyscy zgodni z BHP</Text>
      </View>

      <View style={styles.badgeRow}>
        <Text style={styles.badgeText}>Zatrudnionych: {totalWorkers}</Text>
      </View>

      <View style={styles.list}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111b33",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1d2a45",
    gap: 12,
  },
  headerRow: {
    gap: 4,
  },
  title: {
    color: "#f6f8ff",
    fontSize: 20,
    fontWeight: "700",
  },
  subtle: {
    color: "#9aa0b5",
    fontSize: 13,
  },
  badgeRow: {
    backgroundColor: "#18243e",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#c7c9d6",
    fontSize: 13,
  },
  list: {
    gap: 10,
  },
});
