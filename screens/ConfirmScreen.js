import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ConfirmScreen({ userData, goBack, goToGame }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Confirm Your Information</Text>
      <Text style={styles.label}>Name: {userData.name}</Text>
      <Text style={styles.label}>Email: {userData.email}</Text>
      <Text style={styles.label}>Phone: {userData.phone}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={goBack} />
        <Button title="Continue to Game" onPress={goToGame} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '60%',
  },
});
