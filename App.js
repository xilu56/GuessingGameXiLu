import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Start');
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
  const [checkboxState, setCheckboxState] = useState(false); // Manage checkbox state
  const [isConfirmVisible, setIsConfirmVisible] = useState(false); // Manage modal visibility

  const handleConfirm = (data, checkbox) => {
    setUserData(data); // Save user data
    setCheckboxState(checkbox); // Save checkbox state
    setIsConfirmVisible(true); // Show confirm screen as modal
  };

  const goToGame = () => {
    setIsConfirmVisible(false); // Close modal
    setCurrentScreen('Game'); // Navigate to game screen
  };

  const goBackToStart = () => {
    setIsConfirmVisible(false); // Close modal and go back to StartScreen
  };

  const restartToRegister = () => {
    setIsConfirmVisible(false); // Close modal and go back to StartScreen
    setCurrentScreen('Start');
    setUserData({ name: '', email: '', phone: '' }); // Reset user data
    setCheckboxState(false); // Reset checkbox state
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Start':
        return (
          <StartScreen
            onRegister={handleConfirm}
            userData={userData}
            checkboxState={checkboxState}
          />
        );
      case 'Game':
        return <GameScreen userData={userData} goBackToStart={restartToRegister} />;  // Pass goBackToStart correctly
      default:
        return <StartScreen onRegister={handleConfirm} userData={userData} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {renderScreen()}
      {/* ConfirmScreen as a modal */}
      <ConfirmScreen
        userData={userData}
        isVisible={isConfirmVisible}
        goBack={goBackToStart}
        onRequestClose={restartToRegister}
        goToGame={goToGame}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
