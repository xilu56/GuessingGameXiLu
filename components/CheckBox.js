import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../helpers/styles"; // Import colors from the styles helper

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
    borderColor: colors.textPrimary, // Use textPrimary color from styles
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary, // Use primary color when checked
  },
  checkmark: {
    color: "white",
    fontSize: 18,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.textPrimary, // Use textPrimary color for the label
  },
});
