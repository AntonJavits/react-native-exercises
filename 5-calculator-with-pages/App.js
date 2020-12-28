import React from 'react';
import HomeScreen from './components/HomeScreen';
import HistoryScreen from './components/HistoryScreen';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f2f2f2',
            borderBottomColor: '#A8A8A8',
            borderBottomWidth: 1
          },
          headerTintColor: '#707070',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            textTransform: 'uppercase',
          },
        }}
      >  
        <Stack.Screen
          name='HomeScreen'
          options={{ title: 'Calculator with pages' }}
          component={HomeScreen} />
        <Stack.Screen
          name='HistoryScreen'
          options={{ title: 'History' }}
          component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
