import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "@/constants/Colors";

const CustomHeader = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Weather App (3.0)</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    height: 60,
    backgroundColor: Colors.medium,
    justifyContent: "center",
  },
  headerTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "#fff",
  },
});

export default CustomHeader;
