import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

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
    color: "#3f51b5",
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#3f51b5", // blue border
    padding: 5,
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
