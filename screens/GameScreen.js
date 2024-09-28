import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet, TextInput } from "react-native";
import Card from "../components/Card";

export default function GameScreen({ userData, goBack }) {
  const lastDigit = parseInt(userData.phone.slice(-1)); // 获取手机号最后一位数字
  const [chosenNumber, setChosenNumber] = useState(null); // 用户要猜的数字
  const [attempts, setAttempts] = useState(4); // 猜测次数
  const [timeLeft, setTimeLeft] = useState(60); // 倒计时
  const [started, setStarted] = useState(false); // 游戏是否开始
  const [inputValue, setInputValue] = useState(""); // 用户输入的值
  const [hintUsed, setHintUsed] = useState(false); // 用户是否使用了提示

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

  const handleGuessSubmit = () => {
    const guessedNumber = parseInt(inputValue);
    if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
      Alert.alert("Invalid Input", "Please enter a valid number between 1 and 100.");
      return;
    }

    if (guessedNumber === chosenNumber) {
      Alert.alert("Congratulations!", "You guessed the correct number!");
      handleRestart();
    } else {
      setAttempts(attempts - 1);
      if (attempts - 1 === 0) {
        Alert.alert("Game Over", "You've run out of attempts.");
        handleRestart();
      } else {
        Alert.alert("Try Again", "Incorrect guess. Try again.");
      }
    }
  };

  const handleHint = () => {
    if (!hintUsed) {
      const hintMessage = chosenNumber % 2 === 0 ? "The number is even." : "The number is odd.";
      Alert.alert("Hint", hintMessage);
      setHintUsed(true);
    } else {
      Alert.alert("Hint Used", "You can only use one hint.");
    }
  };

  const handleRestart = () => {
    setStarted(false); // 重置游戏状态
    setTimeLeft(60);
    setAttempts(4);
    setChosenNumber(null);
    setInputValue("");
    setHintUsed(false);
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
          <Button title="Start" onPress={handleStartGame} />
        </Card>
      ) : (
        <Card>
          <Text style={styles.instructionText}>
            Guess a number between 1 & 100 that is a multiply of {lastDigit}
          </Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter your guess"
          />
          <Text style={styles.attemptsText}>Attempts left: {attempts}</Text>
          <Text style={styles.timerText}>Timer: {timeLeft}s</Text>
          <View style={styles.buttonContainer}>
            <Button title="Use a Hint" onPress={handleHint} />
            <Button title="Submit guess" onPress={handleGuessSubmit} />
          </View>
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
  input: {
    height: 40,
    borderColor: "#3f51b5",
    borderWidth: 1,
    width: "80%",
    marginBottom: 20,
    textAlign: "center",
    borderRadius: 5,
    padding: 10,
  },
  attemptsText: {
    fontSize: 20,
    color: "#673ab7",
    textAlign: "center",
    marginBottom: 10,
  },
  timerText: {
    fontSize: 24,
    color: "#e91e63",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
