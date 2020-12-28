import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default function App() {

  const[resultOfSearch, setResultOfSearc] = useState('');
  const[keyword, setKeyword] = useState('');
  const[location, setLocation] = useState(''); 

  const searchPressed = () => {
    // Fetch
  }

  return (

    <View style={styles.container}>

      <StatusBar style={styles.statusBar} barStyle={'dark-content'} />

      <View style={styles.titleSection}>
        <Text style={styles.titleHeading}>Calculator</Text>
      </View>

      <View style={styles.resultsSection}>
        <Text style={styles.resultText}>results</Text>
      </View>
      
      <View style={styles.inputsSection}>
        <TextInput
          placeholder={'Search keyword: '}
          style={styles.textInputBasic}
          onChangeText={keyword => setKeyword(keyword)}
          value={keyword}/>
        <TextInput
        placeholder={'Location: '}
          style={styles.textInputBasic}
          onChangeText={location => setLocation(location)}
          value={location}/>
        <View style={styles.buttonGroup}>
          <Button onPress={searchPressed} title="Search"/>
        </View>
        
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
    flex: 0.7,
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
  resultsSection: {
    flex: 5.1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderBottomColor: '#A8A8A8',
    marginTop: 40,
    borderBottomWidth: 1
  },
  resultText: {
    alignSelf: 'center',
    fontSize: 15,
    color: '#666666'
  },
  inputsSection: {
    flex: 2.5,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInputBasic: {
    width: 200,
    borderColor: '#A8A8A8',
    fontSize: 15,
    borderWidth: 1,
    padding: 5,
    marginBottom: 10
  }
});

