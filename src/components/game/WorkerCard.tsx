import { Pressable, StyleSheet, Text, View } from "react-native";
import { Worker } from "../../types/game";

interface WorkerCardProps {
  worker: Worker;
  cost: number;
  canAfford: boolean;
  onBuy: () => void;
}

export const WorkerCard = ({ worker, cost, canAfford, onBuy }: WorkerCardProps) => {
  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return Math.floor(num).toString();
  };

  return (
    <Pressable
      onPress={canAfford ? onBuy : undefined}
      style={[styles.card, !canAfford && styles.cardDisabled]}
    >
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{worker.icon}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{worker.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{worker.owned}</Text>
          </View>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {worker.description}
        </Text>
        <Text style={styles.perSecond}>+{worker.cottonPerSecond}/s każdy</Text>
        {worker.bhpCompliant && (
          <Text style={styles.bhp}>✓ Zgodne z BHP</Text>
        )}
      </View>

      <View style={[styles.costBox, canAfford ? styles.costActive : styles.costDisabled]}>
        <Text style={[styles.cost, canAfford ? styles.costTextActive : styles.costTextDisabled]}>
          {formatNumber(cost)}
        </Text>
        <Text style={[styles.costLabel, !canAfford && styles.costTextDisabled]}>beli</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0f1a2f",
    borderWidth: 1,
    borderColor: "#1d2a45",
    borderRadius: 14,
    padding: 12,
  },
  cardDisabled: {
    opacity: 0.6,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#152343",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 30,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  name: {
    color: "#f6f8ff",
    fontSize: 15,
    fontWeight: "700",
    flexShrink: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "#1f2d4d",
    borderRadius: 10,
  },
  badgeText: {
    color: "#c7c9d6",
    fontSize: 12,
    fontWeight: "700",
  },
  description: {
    color: "#9aa0b5",
    fontSize: 12,
  },
  perSecond: {
    color: "#8fe3ff",
    fontSize: 12,
    fontWeight: "700",
  },
  bhp: {
    color: "#8be28b",
    fontSize: 11,
  },
  costBox: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "flex-end",
    minWidth: 74,
  },
  costActive: {
    backgroundColor: "#4a8ef0",
  },
  costDisabled: {
    backgroundColor: "#1a263f",
  },
  cost: {
    fontWeight: "800",
    fontSize: 14,
  },
  costLabel: {
    fontSize: 11,
    opacity: 0.8,
  },
  costTextActive: {
    color: "#f6f8ff",
  },
  costTextDisabled: {
    color: "#9aa0b5",
  },
});
