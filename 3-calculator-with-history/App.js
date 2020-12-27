import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, FlatList, Text, View, Button, TextInput, Alert } from 'react-native'

export default function App() {

  const [resultOfCalculation, setResultOfCalculation] = useState(0)
  const [firstNumber, setFirstNumber] = useState('Input first value: ')
  const [secondNumber, setSecondNumber] = useState('Input first value: ')
  // const [operand, setOperand] = useState('')
  const [history, setHistory] = useState(['2 + 2 = 4', '1 - 3 = -2'])

  const handleInputChangeFirstNum = (firstNumber) => {
    setFirstNumber(firstNumber.replace(/[^0-9]/g, ''))
  }
  const handleInputChangeSecondNum = (secondNumber) => {
    setSecondNumber(secondNumber.replace(/[^0-9]/g, ''))
  }

  const addPressed = () => {
    let result = parseInt(firstNumber) + parseInt(secondNumber)
    let historyText = `${firstNumber} + ${secondNumber} = ${result}`
    setResultOfCalculation(result)
    setHistory([...history, historyText]) 
  }
  const substractPressed = () => {
    let result = parseInt(firstNumber) - parseInt(secondNumber)
    let historyText = `${firstNumber} - ${secondNumber} = ${result}`
    setResultOfCalculation(result)
    setHistory([...history, historyText])
  } 

  const addToHistory = (operand) => {
    setHistory([...history, `${firstNumber} ${operand} ${secondNumber} = ${resultOfCalculation}`])
  }

  return (

    <View style={styles.container}>

      <StatusBar style={styles.statusBar} barStyle={'dark-content'} />

      <View style={styles.titleSection}>
        <Text style={styles.titleHeading}>Calculator with history</Text>
      </View>
      
      <View style={styles.bodySection}>
        
        <Text style={styles.calcultationResult}>Result: {resultOfCalculation}</Text>
        <TextInput
          style={styles.textInputBasic}
          onChangeText={firstNumber => handleInputChangeFirstNum(firstNumber)}
          keyboardType='numeric'
          value={firstNumber}/>
        <TextInput
          style={styles.textInputBasic}
          onChangeText={secondNumber => handleInputChangeSecondNum(secondNumber)}
          keyboardType='numeric'
          value={secondNumber}/>
        <View style={styles.buttonGroup}>
          <Button onPress={addPressed} title="Add"/>
          <Button onPress={substractPressed} title="Substract"/>
        </View>
        <View>
        <Text style={styles.historyHeading}>History</Text>
        <FlatList
            data={history}
            renderItem={({item}) =>
              <Text>{item}</Text>}
          />
        </View>
        
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
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
    justifyContent: 'flex-start',
    marginTop: 50
  },
  buttonGroup: {
    backgroundColor: '#f2f2f2',
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
  calcultationResult: {
    fontSize: 30,
    marginBottom: 10
  },
  textInputBasic: {
    width: 200,
    borderColor: '#A8A8A8',
    borderWidth: 1,
    padding: 5,
    marginBottom: 10
  },
  historyHeading: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
    textAlign: 'center'
  }
})
