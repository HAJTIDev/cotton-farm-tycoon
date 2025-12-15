import { useMemo } from "react";
import { View, ScrollView, StyleSheet, useWindowDimensions, Text } from "react-native";
import { useGame } from "../hooks/useGame";
import { CottonButton } from "../components/game/CottonButton";
import { StatsDisplay } from "../components/game/StatsDisplay";
import { WorkerShop } from "../components/game/WorkerShop";
import { GameHeader } from "../components/game/GameHeader";

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

  const { width } = useWindowDimensions();
  const isWide = useMemo(() => width >= 900, [width]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent}>
      <GameHeader onReset={resetGame} />

      <View style={[styles.main, isWide && styles.mainWide]}>
        <View style={[styles.left, isWide && styles.leftWide]}>
          <StatsDisplay gameState={gameState} />
          <CottonButton
            onClick={handleClick}
            isClicking={isClicking}
            floatingNumbers={floatingNumbers}
          />
        </View>

        <View style={[styles.right, isWide && styles.rightWide]}>
          <WorkerShop
            workers={gameState.workers}
            cotton={gameState.cotton}
            getWorkerCost={getWorkerCost}
            onBuy={buyWorker}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🛡️ Wszystkie operacje prowadzone zgodnie z przepisami BHP 🛡️
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0b1224",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  main: {
    flexDirection: "column",
    gap: 24,
  },
  mainWide: {
    flexDirection: "row",
  },
  left: {
    flex: 1,
    alignItems: "center",
    gap: 24,
    paddingVertical: 16,
  },
  leftWide: {
    paddingRight: 12,
  },
  right: {
    flex: 1,
    paddingVertical: 16,
  },
  rightWide: {
    paddingLeft: 12,
  },
  footer: {
    marginTop: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  footerText: {
    color: "#c7c9d6",
    fontSize: 12,
    textAlign: "center",
  },
});

export default Index;
