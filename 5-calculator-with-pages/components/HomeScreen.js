import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <StatusBar style='auto' />
      <Text>Home Screen. Open up App.js to start working on your app!</Text>
      <Button title='History' onPress={ () => navigation.navigate('HistoryScreen')}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
