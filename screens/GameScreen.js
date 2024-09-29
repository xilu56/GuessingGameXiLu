import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet, TextInput, Image } from "react-native";
import Card from "../components/Card";
import {colors} from "../helpers/styles"; // Import colors from the styles helper

export default function GameScreen({ userData, goBack }) {
  const lastDigit = parseInt(userData.phone.slice(-1)); // Get the last digit of the user's phone number
  const [chosenNumber, setChosenNumber] = useState(null); // The number the user needs to guess
  const [attempts, setAttempts] = useState(4); // Number of attempts left
  const [totalAttempts, setTotalAttempts] = useState(0); // Total attempts used
  const [timeLeft, setTimeLeft] = useState(60); // Countdown timer
  const [started, setStarted] = useState(false); // Whether the game has started or not
  const [inputValue, setInputValue] = useState(""); // User's input value
  const [hintUsed, setHintUsed] = useState(false); // Whether the hint has been used
  const [hintMessage, setHintMessage] = useState(""); // Hint message
  const [guessResult, setGuessResult] = useState(null); // Stores whether the guess was correct or needs adjustment
  const [showResultCard, setShowResultCard] = useState(false); // Controls whether to show the result card after a wrong guess
  const [showSuccessCard, setShowSuccessCard] = useState(false); // Controls whether to show the success card after a correct guess
  const [gameOver, setGameOver] = useState(false); // Game over state
  const [gameOverReason, setGameOverReason] = useState(""); // Reason for game over

  /**
   * Countdown timer that decreases every second once the game starts.
   */
  useEffect(() => {
    let timer;
    if (started && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); // Decrease timer every second
    } else if (timeLeft === 0) {
        setGameOverReason("You are out of time");
        setGameOver(true); // Trigger game over when the timer runs out
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

  // Reduce attempts regardless of input validity
  setAttempts(attempts - 1); 

  // Check if the user has run out of attempts
  if (attempts - 1 === 0) {
    setGameOverReason("You are out of attempts");
    setGameOver(true); // Trigger game over if no attempts are left
    return; // End the function to prevent further execution
  }

  // Validate the input: check if it's a number between 1 and 100 and is a multiple of the last digit
  if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
    Alert.alert("Invalid Input", `Number has to be a multiple of ${lastDigit} between 1 and 100.`);
    return; // Stop further execution if the input is invalid
  }

  if (guessedNumber % lastDigit !== 0) {
    Alert.alert("Invalid Input", `Number has to be a multiple of ${lastDigit} between 1 and 100.`);
    return; // Stop further execution if the input is invalid
  }

  // If the input is valid, continue with the game logic
  setTotalAttempts(totalAttempts + 1); // Increment total attempts

  if (guessedNumber === chosenNumber) {
    setShowSuccessCard(true); // Show success card if the guess is correct
  } else {
    const resultMessage = guessedNumber > chosenNumber ? "You should guess lower." : "You should guess higher.";
    setGuessResult(resultMessage);
    setShowResultCard(true); // Show the "Try Again" card with feedback
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
      setHintMessage(hintMessage); // Set the hint message
      setHintUsed(true); // Mark the hint as used
    } else {
      Alert.alert("Hint Used", "You can only use one hint.");
    }
  };

  /**
   * Ends the game and returns to the start screen after displaying a "Game Over" message.
   */
  const handleEndGame = () => {
      setGameOverReason("You chose to end the game"); // Set the game over reason to indicate the user ended the game
      setGameOver(true); // Trigger game over
   };


  /**
   * Restarts the game and chooses a new number.
   */
  const handleNewGame = () => {
    setGameOver(false); // Reset game over state
    setShowSuccessCard(false); // Hide success card
    setTimeLeft(60); // Reset timer
    setAttempts(4); // Reset attempts
    setInputValue(""); // Clear input
    setHintUsed(false); // Reset hint state
    setHintMessage(""); // Clear the hint message
    setTotalAttempts(0); // Reset total attempts
    setGuessResult(null); // Clear guess result
    setShowResultCard(false); // Hide result card
    handleStartGame(); // Start a new game with a new number
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
    setTotalAttempts(0); // Reset total attempts
    setShowSuccessCard(false); // Hide success card
    goBack(); // Return to the StartScreen
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.restartText} onPress={handleRestart}>
        Restart
      </Text>
      {gameOver ? (
        <Card>
          <Text style={styles.instructionText}>The game is over</Text>
          <Image
            source={require("../assets/sad.png")}
            style={styles.image}
          />
          <Text style={styles.instructionText}>{gameOverReason}</Text>
          <Button title="New Game" onPress={handleNewGame} />
        </Card>
      ) : !started ? (
        <Card>
          <Text style={styles.instructionText}>
            Guess a number between 1 & 100 that is a multiply of the last digit of {lastDigit}.
          </Text>
          <Button title="Start" onPress={handleStartGame} />
        </Card>
      ) : showSuccessCard ? (
        <Card>
          <Text style={styles.instructionText}>You guessed correct!</Text>
          <Text style={styles.instructionText}>Attempts used: {totalAttempts}</Text>
          <Image
            source={{ uri: `https://picsum.photos/id/${chosenNumber}/100/100` }}
            style={styles.image}
          />
          <Button title="New Game" onPress={handleNewGame} />
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
        {hintMessage ? <Text style={styles.instructionText}>{hintMessage}</Text> : null}
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
    backgroundColor: colors.background,
  },
  restartText: {
    position: "absolute",
    top: 40,
    right: 20,
    fontSize: 18,
    color: colors.textPrimary,
    fontWeight: "bold",
  },
  instructionText: {
    fontSize: 18,
    color: colors.textPrimary,
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: colors.textPrimary,
    borderWidth: 1,
    width: "80%",
    marginBottom: 20,
    textAlign: "center",
    borderRadius: 5,
    padding: 10,
  },
  attemptsText: {
    fontSize: 20,
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 10,
  },
  timerText: {
    fontSize: 24,
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
});