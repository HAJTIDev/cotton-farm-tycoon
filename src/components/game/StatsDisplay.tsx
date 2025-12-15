import { StyleSheet, Text, View } from "react-native";
import { GameState } from "../../types/game";

interface StatsDisplayProps {
  gameState: GameState;
}

export const StatsDisplay = ({ gameState }: StatsDisplayProps) => {
  const formatNumber = (num: number): string => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return Math.floor(num).toString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.counterBlock}>
        <Text style={styles.mainNumber}>{formatNumber(gameState.cotton)}</Text>
        <Text style={styles.subtitle}>beli bawełny</Text>
      </View>

      <View style={styles.perSecondRow}>
        <Text style={styles.perSecondIcon}>⚡</Text>
        <Text style={styles.perSecondText}>
          <Text style={styles.perSecondValue}>{gameState.cottonPerSecond.toFixed(1)}</Text> na sekundę
        </Text>
      </View>

      <Text style={styles.total}>Zebrano łącznie: {formatNumber(gameState.totalCotton)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 8,
  },
  counterBlock: {
    alignItems: "center",
  },
  mainNumber: {
    fontSize: 56,
    fontWeight: "800",
    color: "#f6f8ff",
  },
  subtitle: {
    marginTop: 4,
    color: "#c7c9d6",
    fontSize: 18,
  },
  perSecondRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  perSecondIcon: {
    fontSize: 18,
  },
  perSecondText: {
    color: "#c7c9d6",
    fontSize: 18,
  },
  perSecondValue: {
    color: "#8fe3ff",
    fontWeight: "700",
  },
  total: {
    color: "#9aa0b5",
    fontSize: 14,
  },
});
