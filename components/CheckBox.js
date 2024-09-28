import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

export default function CheckBox({ value, onValueChange, label }) {
  return (
    <View style={styles.checkboxContainer}>
      <Switch value={value} onValueChange={onValueChange} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: "#3f51b5", // blue text
  },
});
