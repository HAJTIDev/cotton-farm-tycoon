import { Pressable, StyleSheet, Text, View } from "react-native";

interface GameHeaderProps {
  onReset: () => void;
}

export const GameHeader = ({ onReset }: GameHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.emoji}>🌾</Text>
        <View>
          <Text style={styles.title}>Cotton Clicker</Text>
          <Text style={styles.subTitle}>100% zgodne z BHP</Text>
        </View>
      </View>

      <Pressable onPress={onReset} style={styles.resetButton} accessibilityLabel="Resetuj grę">
        <Text style={styles.resetText}>↻ Reset</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#1d2a45",
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  emoji: {
    fontSize: 28,
  },
  title: {
    color: "#f6f8ff",
    fontSize: 20,
    fontWeight: "800",
  },
  subTitle: {
    color: "#8be28b",
    fontSize: 12,
  },
  resetButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#1a263f",
  },
  resetText: {
    color: "#ff8b8b",
    fontWeight: "700",
  },
});
