
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
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
    setCalculated(parseFloat( (ammount !== '' ? ammount : 0) * exchangeRates[selectedCurrency]).toFixed(2));
  }

  return (

    <View style={styles.container}>
      <StatusBar style={styles.statusBar} barStyle={'dark-content'} />
     
      <View style={styles.titleSection}>
        <Text style={styles.titleHeading}>Euro converter</Text>
      </View>
      <View style={styles.heroImgSection}>
        <Image
          style={styles.heroImg}
          source={require('./img/euro-coin.jpg')}
        />
      </View>

      <View style={styles.resultsSection}>
        <Text style={styles.resultHeading}>{ isNaN(calculated) ? 'Enter ammount' : calculated + ' €'}</Text>
      </View>
      
      <View style={styles.inputsSection}>
        <TextInput
          style={styles.textInputBasic}
          placeholder={'0'}
          onChangeText={ammount => setAmmount(ammount.replace(/,/g, '.'))}
          value={ammount}
          keyboardType={'numeric'}
        />
        <Picker
          style={styles.picker}
          selectedValue={selectedCurrency}
          onValueChange={(itemValue) => {
            setSelectedCurrency(itemValue);
          }}>
          {currencies.map((currency, index) => (
            <Picker.Item key={index} label={currency} value={currency} />
          ))}
        </Picker>
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
    flex: 4,
    justifyContent: 'center',
    alignContent: 'center'
  },
  heroImg: {
    height: 300,
    width: 300
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
    height: 50,
    width: 100
  },
  buttonSection: {
    flex: 1
  }
});

