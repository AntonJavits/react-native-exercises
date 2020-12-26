import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native'

export default function App() {

  const defaultOutput = 'Guess a number between 1-100'
  const newRandomNumber = Math.floor(Math .random() * 100) + 1
  const [guessedNumber, setGuessedNumber] = useState('')
  const [guessCount, setGuessCount] = useState(0)
  const [outputText, setOutputText] = useState(defaultOutput)
  const [randomNumber, setRandomNumber] = useState(newRandomNumber)

  // console.warn(`Random number is ${randomNumber}, count: ${guessCount}`)

  const handleInputChangeNumber = (event) => {
    setGuessedNumber(event.target.value)
  }

  const guessMade = () => {

    let updatedCount = guessCount + 1
    setGuessCount(updatedCount)

    let numberToEvaluate = parseInt(guessedNumber)

    if (numberToEvaluate > randomNumber) {
      setOutputText(`Your guess ${guessedNumber} is too high`)
    }
    if (numberToEvaluate < randomNumber) {
      setOutputText(`Your guess ${guessedNumber} is too low`)
    }
    if (numberToEvaluate == randomNumber) {
      Alert.alert(`You guessed the number in ${updatedCount} guesses`)
      setGuessCount(0)
      setGuessedNumber('')
      setRandomNumber(newRandomNumber)
      setOutputText(defaultOutput)
    } 
  }

  return (

    <View style={styles.container}>

      <StatusBar style={styles.statusBar} barStyle={'dark-content'} />

      <View style={styles.titleSection}>
        <Text style={styles.titleHeading}>Number Guessing Game</Text>
      </View>
      
      <View style={styles.bodySection}>
        
        <Text style={styles.outputText}>{outputText}</Text>
        <TextInput
          style={styles.textInputBasic}
          onChangeText={guessedNumber => setGuessedNumber(guessedNumber)}
          keyboardType='numeric'
          value={guessedNumber}
        />

        <View style={styles.buttonGroup}>
          <Button onPress={guessMade} title="Make Guess"/>
        </View>
        
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  StatusBar: {
    backgroundColor: '#f2f2f2'
  },
  titleSection: {
    flex: 0.7,
    backgroundColor: '#f2f2f2',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#A8A8A8',
    borderBottomWidth: 1
  },
  bodySection: {
    flex: 5.3,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonGroup: {
    width: 200,
    padding: 10,
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginBottom: 60
  },
  titleHeading: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#707070',
    textTransform: 'uppercase',
    marginTop: 10
  },
  outputText: {
    fontSize: 20,
    marginBottom: 10
  },
  textInputBasic: {
    width: 100,
    borderColor: '#A8A8A8',
    borderWidth: 1,
    padding: 5,
    marginBottom: 10
  }
})
