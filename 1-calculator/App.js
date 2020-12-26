import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'

export default function App() {

  const[resultOfCalculation, setResultOfCalculation] = useState(0)
  const[firstNumber, setFirstNumber] = useState('Input first value: ')
  const[secondNumber, setSecondNumber] = useState('Input first value: ')

  const handleInputChangeFirstNum = (firstNumber) => {
    setFirstNumber(firstNumber.replace(/[^0-9]/g, ''))
  }
  const handleInputChangeSecondNum = (secondNumber) => {
    setSecondNumber(secondNumber.replace(/[^0-9]/g, ''))
  }

  const addPressed = () => {
    setResultOfCalculation(parseInt(firstNumber) + parseInt(secondNumber))  
  }
  const substractPressed = () => {
    setResultOfCalculation(parseInt(firstNumber) - parseInt(secondNumber))
  }
  return (

    <View style={styles.container}>

      <StatusBar style={styles.StatusBar} barStyle={'dark-content'} />

      <View style={styles.titleSection}>
        <Text style={styles.titleHeading}>Calculator</Text>
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
  }
});
