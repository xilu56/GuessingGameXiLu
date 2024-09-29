import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../helpers/styles"; // Import colors from the styles helper

export default function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.grey, // Use grey background from styles
    padding: 20,
    borderRadius: 10,
    shadowColor: colors.shadowColor, // Use shadow color from styles
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 6,
    elevation: 5,
    width: "90%",
    alignItems: "center",
  },
});
