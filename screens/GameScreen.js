import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet, TextInput } from "react-native";
import Card from "../components/Card";

export default function GameScreen({ userData, goBack }) {
  const lastDigit = parseInt(userData.phone.slice(-1)); // Get the last digit of the user's phone number
  const [chosenNumber, setChosenNumber] = useState(null); // The number the user needs to guess
  const [attempts, setAttempts] = useState(4); // Number of attempts left
  const [timeLeft, setTimeLeft] = useState(60); // Countdown timer
  const [started, setStarted] = useState(false); // Whether the game has started or not
  const [inputValue, setInputValue] = useState(""); // User's input value
  const [hintUsed, setHintUsed] = useState(false); // Whether the hint has been used
  const [guessResult, setGuessResult] = useState(null); // Stores whether the guess was correct or needs adjustment
  const [showResultCard, setShowResultCard] = useState(false); // Controls whether to show the result card after a wrong guess

  /**
   * Countdown timer that decreases every second once the game starts.
   */
  useEffect(() => {
    let timer;
    if (started && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); // Decrease timer every second
    } else if (timeLeft === 0) {
      Alert.alert("Time's up!", "You've run out of time!");
      handleRestart();
    }
    return () => clearTimeout(timer); // Clear timer when time reaches 0
  }, [timeLeft, started]);

  /**
   * Generates multiples of the user's last digit between 1 and 100.
   * @param {number} digit - Last digit of the user's phone number.
   * @returns {number[]} An array of multiples of the digit.
   */
  const generateMultiples = (digit) => {
    const multiples = [];
    for (let i = digit; i <= 100; i += digit) {
      multiples.push(i);
    }
    return multiples;
  };

  /**
   * Handles the start of the game by choosing a random number from the list of multiples.
   */
  const handleStartGame = () => {
    const multiples = generateMultiples(lastDigit); // Generate multiples
    const randomIndex = Math.floor(Math.random() * multiples.length);
    setChosenNumber(multiples[randomIndex]); // Choose a random number
    setStarted(true); // Start the game
  };

  /**
   * Handles the user's guess submission. Validates the input and checks if it matches the chosen number.
   */
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
      setAttempts(attempts - 1); // Reduce attempts
      if (attempts - 1 === 0) {
        Alert.alert("Game Over", "You've run out of attempts.");
        handleRestart();
      } else {
        const resultMessage = guessedNumber > chosenNumber ? "You should guess lower." : "You should guess higher.";
        setGuessResult(resultMessage);
        setShowResultCard(true); // Show the "Try Again" card
      }
    }
  };

  /**
   * Clears the input and allows the user to try guessing again without resetting the game.
   */
  const handleTryAgain = () => {
    setInputValue(""); // Clear the input field
    setShowResultCard(false); // Hide the result card
  };

  /**
   * Provides the user with a hint about the chosen number. Only one hint can be used.
   */
  const handleHint = () => {
    if (!hintUsed) {
      const hintMessage = chosenNumber % 2 === 0 ? "The number is even." : "The number is odd.";
      Alert.alert("Hint", hintMessage);
      setHintUsed(true); // Mark the hint as used
    } else {
      Alert.alert("Hint Used", "You can only use one hint.");
    }
  };

  /**
   * Ends the game and returns to the start screen after displaying a "Game Over" message.
   */
  const handleEndGame = () => {
    Alert.alert("Game Over", "Thank you for playing.");
    handleRestart();
  };

  /**
   * Resets the game by clearing all states and returning to the start screen.
   */
  const handleRestart = () => {
    setStarted(false); // Reset the game state
    setTimeLeft(60); // Reset timer
    setAttempts(4); // Reset attempts
    setChosenNumber(null); // Reset chosen number
    setInputValue(""); // Clear input
    setHintUsed(false); // Reset hint state
    setShowResultCard(false); // Hide result card
    goBack(); // Return to the StartScreen
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
      ) : showResultCard ? (
        <Card>
          <Text style={styles.instructionText}>You did not guess correct!</Text>
          <Text style={styles.instructionText}>{guessResult}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Try Again" onPress={handleTryAgain} />
            <Button title="End the Game" onPress={handleEndGame} />
          </View>
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
