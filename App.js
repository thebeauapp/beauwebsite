// App.js
import React from "react";
import { StyleSheet, View } from "react-native";
import WaitlistScreen from "./components/WaitlistScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <WaitlistScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
