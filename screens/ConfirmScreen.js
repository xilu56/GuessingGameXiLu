import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Card from "../components/Card";

export default function ConfirmScreen({ userData, goBack, goToGame }) {
  return (
    <View style={styles.screen}>
      <Card>
        <Text style={styles.label}>Hello {userData.name}</Text>
        <Text style={styles.label}>Here is the information you entered:</Text> 
        <Text style={styles.label}>Email: {userData.email}</Text>
        <Text style={styles.label}>Phone: {userData.phone}</Text>
        <Text style={styles.label}>If it is not correct, please go back and edit them.</Text>

        <View style={styles.buttonContainer}>
          <Button title="Go back" onPress={goBack} />
          <Button title="Continue" onPress={goToGame} />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#b3e5fc",
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
});
