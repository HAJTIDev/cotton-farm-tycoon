import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from "react-native";
import { FloatingNumber } from "../../types/game";

interface CottonButtonProps {
  onClick: (x: number, y: number) => void;
  isClicking: boolean;
  floatingNumbers: FloatingNumber[];
}

export const CottonButton = ({ onClick, isClicking, floatingNumbers }: CottonButtonProps) => {
  const handlePress = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    onClick(locationX, locationY);
  };

  return (
    <View style={styles.wrapper}>
      {floatingNumbers.map((num) => (
        <Text
          key={num.id}
          style={[
            styles.floating,
            {
              left: num.x,
              top: num.y,
            },
          ]}
        >
          +{Math.floor(num.value)}
        </Text>
      ))}

      <View style={styles.glow} />

      <Pressable
        onPressIn={handlePress}
        style={[styles.button, isClicking && styles.buttonActive]}
      >
        <View style={styles.inner} />
        <Text style={styles.emoji}>☁️</Text>
        <View style={styles.shine} />
      </Pressable>

      <Text style={styles.caption}>Kliknij, aby zebrać bawełnę!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  button: {
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: "#fef7e5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "rgba(255, 212, 128, 0.6)",
    shadowColor: "#ffd37a",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 8,
    transform: [{ scale: 1 }],
  },
  buttonActive: {
    transform: [{ scale: 0.94 }],
  },
  inner: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
    bottom: 12,
    borderRadius: 84,
    backgroundColor: "#fffdf8",
    opacity: 0.9,
  },
  emoji: {
    fontSize: 64,
  },
  shine: {
    position: "absolute",
    top: 16,
    left: 32,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  caption: {
    marginTop: 12,
    color: "#c7c9d6",
    fontSize: 14,
  },
  glow: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "rgba(255, 215, 140, 0.15)",
    shadowColor: "#ffd37a",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  floating: {
    position: "absolute",
    color: "#ffd37a",
    fontSize: 22,
    fontWeight: "700",
  },
});
