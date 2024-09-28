import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import Card from "../components/Card";

export default function GameScreen({ userData, goBack }) {
  const lastDigit = parseInt(userData.phone.slice(-1)); // 获取手机号最后一位数字
  const [chosenNumber, setChosenNumber] = useState(null); // 用户要猜的数字
  const [attempts, setAttempts] = useState(4); // 猜测次数
  const [timeLeft, setTimeLeft] = useState(60); // 倒计时
  const [started, setStarted] = useState(false); // 标志游戏是否开始

  useEffect(() => {
    let timer;
    if (started && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); // 每秒倒计时
    } else if (timeLeft === 0) {
      Alert.alert("Time's up!", "You've run out of time!");
      handleRestart();
    }
    return () => clearTimeout(timer); // 清除计时器
  }, [timeLeft, started]);

  const generateMultiples = (digit) => {
    const multiples = [];
    for (let i = digit; i <= 100; i += digit) {
      multiples.push(i);
    }
    return multiples;
  };

  const handleStartGame = () => {
    const multiples = generateMultiples(lastDigit); // 生成用户最后一位数字的倍数
    const randomIndex = Math.floor(Math.random() * multiples.length);
    setChosenNumber(multiples[randomIndex]); // 随机选择一个倍数作为目标数字
    setStarted(true); // 游戏开始
  };

  const handleRestart = () => {
    setStarted(false); // 重置游戏状态
    setTimeLeft(60);
    setAttempts(4);
    setChosenNumber(null);
    goBack(); // 返回到 StartScreen
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.restartText} onPress={handleRestart}>
        Restart
      </Text>
      {!started ? (
        <Card>
          <Text style={styles.instructionText}>
            Guess a number between 1 & 100 that is a multiply of the last digit of your phone number.
          </Text>
          <Text style={styles.instructionText}>
            You have 60 seconds and 4 attempts to guess correctly.
          </Text>
          <Button title="Start" onPress={handleStartGame} />
        </Card>
      ) : (
        <Card>
          <Text style={styles.timerText}>Time Left: {timeLeft} seconds</Text>
          <Text style={styles.attemptsText}>Attempts Left: {attempts}</Text>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#b3e5fc",
  },
  restartText: {
    position: "absolute",
    top: 40,
    right: 20,
    fontSize: 18,
    color: "#1976d2",
    fontWeight: "bold",
  },
  instructionText: {
    fontSize: 18,
    color: "#3f51b5",
    textAlign: "center",
    marginVertical: 10,
  },
  timerText: {
    fontSize: 24,
    color: "#e91e63",
    textAlign: "center",
  },
  attemptsText: {
    fontSize: 20,
    color: "#673ab7",
    textAlign: "center",
    marginTop: 10,
  },
});
