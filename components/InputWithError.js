import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import {colors} from "../helpers/styles"; // Import colors from the styles helper

export default function InputWithError({ placeholder, value, onChangeText, error, keyboardType }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{placeholder}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType || "default"}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    width: "100%",
  },
  label: {
    color: colors.textPrimary, // Use textPrimary color for label
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.textPrimary, // Use textPrimary color for border
    padding: 5,
    width: "100%",
  },
  errorText: {
    color: colors.alert, // Use alert color for error message
    fontSize: 12,
    marginTop: 5,
  },
});
