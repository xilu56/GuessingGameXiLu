import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CustomCheckBox({ value, onValueChange }) {
  return (
    <View style={styles.checkboxContainer}>
      <TouchableOpacity
        style={[styles.checkboxBase, value && styles.checkboxChecked]}
        onPress={() => onValueChange(!value)}
      >
        {value && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      <Text style={styles.label}>I am not a robot</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: "#3f51b5",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#3f51b5",
  },
  checkmark: {
    color: "white",
    fontSize: 18,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: "#3f51b5",
  },
});
