import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Start'); // 当前屏幕状态
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' }); // 保存用户输入的数据

  const handleConfirm = (data) => {
    setUserData(data); // 保存用户输入的数据
    setCurrentScreen('Confirm'); // 切换到ConfirmScreen
  };

  const goToGame = () => {
    setCurrentScreen('Game'); // 切换到GameScreen
  };

  const goBackToStart = () => {
    setCurrentScreen('Start'); // 返回StartScreen并重置
    setUserData({ name: '', email: '', phone: '' });
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Start':
        return <StartScreen onRegister={handleConfirm} userData={userData} />;
      case 'Confirm':
        return <ConfirmScreen userData={userData} goBack={goBackToStart} goToGame={goToGame} />;
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
