
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {

  const [exchangeRates, setExchangeRates] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('js');
  const [ammount, setAmmount] = useState('');
  const [calculated, setCalculated] = useState();

  useEffect(() => {
    const fetchRates = async () => {
      let url = `https://api.exchangeratesapi.io/latest`;
      let response = await fetch(url);
      let data = await response.json();
      setExchangeRates(data.rates);
      setCurrencies(Object.keys(data.rates));
    }
    fetchRates();
  }, []);

  const convertCurrency = () => {
    setCalculated(parseFloat(ammount !== '' ? ammount : 0) * exchangeRates[selectedCurrency]);
  }

  return (

    <View style={styles.container}>

      <StatusBar style={styles.statusBar} barStyle={'dark-content'} />

      <View style={styles.titleSection}>
        <Text style={styles.titleHeading}>Euro converter</Text>
      </View>

      <View style={styles.heroImgSection}>
        <Text>img...</Text>
      </View>

      <View style={styles.resultsSection}>
        <Text style={styles.resultHeading}>{ isNaN(calculated) ? 'Enter ammount' : calculated + ' €'}</Text>
      </View>
      
      <View style={styles.inputsSection}>
        <TextInput
          style={styles.textInputBasic}
          placeholder={'0'}
          onChangeText={ammount => setAmmount(ammount)}
          value={ammount}
          keyboardType={'numeric'}
        />
        <View style={styles.picker}>
          <Picker
            style={{height: 50, width: 100}}
            selectedValue={selectedCurrency}
            onValueChange={(itemValue) => {
              setSelectedCurrency(itemValue);
            }}>
            {currencies.map((currency, index) => ( // key = currency?
              <Picker.Item key={index} label={currency} value={currency} />
            ))}
          </Picker>
        </View>

      </View>

      <View style={styles.buttonSection}>
          <Button onPress={convertCurrency} title="Convert"/>
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#f2f2f2'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#A8A8A8',
    borderBottomWidth: 1
  },
  titleHeading: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#707070',
    textTransform: 'uppercase',
    marginTop: 10
  },
  heroImgSection: {
    flex: 4
  },
  resultsSection: {
    flex: 1
  },
  resultHeading: {
    fontSize: 30,
    marginBottom: 10
  },
  inputsSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInputBasic: {
    width: 100,
    borderColor: '#A8A8A8',
    fontSize: 15,
    borderWidth: 1,
    padding: 5,
    marginRight: 5
  },
  picker: {
    width: 100,
    borderColor: '#A8A8A8',
    fontSize: 15,
    borderWidth: 1,
    padding: 5,
    marginRight: 5
  },
  buttonSection: {
    flex: 1
  }
});

