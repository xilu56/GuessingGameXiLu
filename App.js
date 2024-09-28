import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Start'); 

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Start':
        return <StartScreen goToConfirm={() => setCurrentScreen('Confirm')} />;
      case 'Confirm':
        return <ConfirmScreen goToGame={() => setCurrentScreen('Game')} goBack={() => setCurrentScreen('Start')} />;
      case 'Game':
        return <GameScreen goBack={() => setCurrentScreen('Start')} />;
      default:
        return <StartScreen goToConfirm={() => setCurrentScreen('Confirm')} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {renderScreen()}
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
