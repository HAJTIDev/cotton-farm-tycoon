import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import Index from "./pages/Index";

const App = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar style="light" />
    <Index />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1224",
  },
});

export default App;
