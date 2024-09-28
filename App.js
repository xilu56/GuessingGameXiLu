import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Start');
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });

  const handleConfirm = (data) => {
    setUserData(data);
    setCurrentScreen('Game'); // 直接进入游戏界面
  };

  const goBackToStart = () => {
    setCurrentScreen('Start');
    setUserData({ name: '', email: '', phone: '' });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Start':
        return <StartScreen onRegister={handleConfirm} userData={userData} />;
      case 'Game':
        return <GameScreen userData={userData} goBack={goBackToStart} />;
      default:
        return <StartScreen onRegister={handleConfirm} userData={userData} />;
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
