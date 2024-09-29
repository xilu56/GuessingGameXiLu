import React from 'react';
import { View, Text, Button, StyleSheet, Modal } from 'react-native';
import Card from "../components/Card";
import { colors } from "../helpers/styles"; // Import colors from the styles helper

export default function ConfirmScreen({ userData, goBack, goToGame, isVisible, onRequestClose }) {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContainer}>
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
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 10,
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
