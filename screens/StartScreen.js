import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, Button } from "react-native";
import Card from "../components/Card";
import InputWithError from "../components/InputWithError";
import CheckBox from "../components/CheckBox";
import {colors} from "../helpers/styles"; // Import colors from the styles helper

export default function StartScreen({ onRegister, userData }) {
  const [name, setName] = useState(userData.name || ""); 
  const [email, setEmail] = useState(userData.email || "");
  const [phone, setPhone] = useState(userData.phone || "");
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });

  const validateName = (input) => {
    if (!isNaN(input) || input.length < 2) {
      setErrors((prev) => ({ ...prev, name: "Please enter a valid name" }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
    setName(input);
  };

  const validateEmail = (input) => {
    if (!input.includes("@") || !input.includes(".")) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    setEmail(input);
  };

  const validatePhone = (input) => {
    const lastDigit = input.slice(-1);
    if (isNaN(input) || input.length !== 10 || lastDigit === "0" || lastDigit === "1") {
      setErrors((prev) => ({ ...prev, phone: "Please enter a valid phone number" }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
    setPhone(input);
  };

  const handleRegister = () => {
    if (!name || !email || !phone || errors.name || errors.email || errors.phone) {
      Alert.alert("Invalid Input", "Please check the input values!");
    } else {
      onRegister({ name, email, phone }); 
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setIsChecked(false);
    setErrors({ name: "", email: "", phone: "" });
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Welcome</Text>
      <Card>
        <InputWithError
          placeholder="Name"
          value={name}
          onChangeText={validateName}
          error={errors.name}
        />
        <InputWithError
          placeholder="Email address"
          value={email}
          onChangeText={validateEmail}
          error={errors.email}
        />
        <InputWithError
          placeholder="Phone Number"
          value={phone}
          keyboardType="number-pad"
          onChangeText={validatePhone}
          error={errors.phone}
        />
        <CheckBox value={isChecked} onValueChange={setIsChecked} label="I am not a robot" />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button title="Reset" color={colors.alert} onPress={handleReset} />
          </View>
          <View style={[styles.buttonWrapper, !isChecked && styles.disabledButton]}>
            <Button
              title="Register"
              color={colors.primary} // Assign a color for the button
              onPress={handleRegister}
              disabled={!isChecked} // Disable the button if the checkbox is unchecked
            />
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  buttonWrapper: {
    width: "40%", // Adjust the button width as needed
  },
  disabledButton: {
    opacity: 0.6,
  },
});

