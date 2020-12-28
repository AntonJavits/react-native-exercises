import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, TextInput, Alert } from 'react-native';

const HomeScreen = ({navigation}) => {

  const [resultOfCalculation, setResultOfCalculation] = useState(0)
  const [firstNumber, setFirstNumber] = useState('Set first number: ')
  const [secondNumber, setSecondNumber] = useState('Set second number: ')
  const [history, setHistory] = useState([])

  const handleInputChangeFirstNum = (firstNumber) => {
    setFirstNumber(firstNumber.replace(/[^0-9]/g, ''))
  } 
  const handleInputChangeSecondNum = (secondNumber) => {
    setSecondNumber(secondNumber.replace(/[^0-9]/g, ''))
  }
  const addPressed = () => {
    if ( isNaN(firstNumber) || isNaN(secondNumber) )  { Alert.alert('Set proper numbers') } else {
      let result = parseInt(firstNumber) + parseInt(secondNumber)
      let historyText = `${firstNumber} + ${secondNumber} = ${result}`
      setResultOfCalculation(result)
      setHistory([...history, {key: historyText}])
      setFirstNumber('Set first number: ')
      setSecondNumber('Set second number: ')
    } 
  }
  const substractPressed = () => {
    if ( isNaN(firstNumber) || isNaN(secondNumber) )  { Alert.alert('Set proper numbers') } else {
      let result = parseInt(firstNumber) - parseInt(secondNumber)
      let historyText = `${firstNumber} - ${secondNumber} = ${result}`
      setResultOfCalculation(result)
      setHistory([...history, {key: historyText}])
      setFirstNumber('Set first number: ')
      setSecondNumber('Set second number: ')
    }
  } 
  const addToHistory = (operand) => {
    setHistory([...history, `${firstNumber} ${operand} ${secondNumber} = ${resultOfCalculation}`])
  }
  
  return (
    <View style={styles.screen}>
      <StatusBar style='auto' />
      
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
        <Button onPress={addPressed} title=" + "/>
        <Button onPress={substractPressed} title=" - "/>
        <Button title='History' onPress={ () => {
            navigation.navigate('HistoryScreen', { history: history })
          }}></Button>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    backgroundColor: '#f2f2f2'
  },
  bodySection: {
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
});

export default HomeScreen;
