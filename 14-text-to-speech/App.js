import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';

export default function App() {

  const [wordsToSay, setWordsToSay] = useState('test')

  const speak = () =>  {
    let thingToSay = 'one two tree';
    Speech.speak(wordsToSay);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInputBasic}
        onChangeText={wordsToSay => setWordsToSay(wordsToSay)}
        value={wordsToSay}
      />
      <Button title="Press to hear text" onPress={speak} />
      <StatusBar style="auto" />
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
  textInputBasic: {
    width: 100,
    borderColor: '#A8A8A8',
    borderWidth: 1,
    padding: 5,
    marginBottom: 10
  }
});
