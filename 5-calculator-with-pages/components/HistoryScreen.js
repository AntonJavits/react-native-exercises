import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, FlatList } from 'react-native';

const HistoryScreen = ({ route }) => {
  const { history } = route.params;
  return (
    <View style={styles.screen}>
      <StatusBar style='auto' />
      <Text style={styles.historyHeading}>History</Text>
      <FlatList
            data={history}
            renderItem={({item}) =>
              <Text style={styles.historyText}>{item.key}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    backgroundColor: '#f2f2f2'
  },
  historyHeading: {
    marginTop: 50,
    marginBottom: 10,
    fontSize: 30,
    textAlign: 'center'
  },
  historyText: {
    marginBottom: 5,
    fontSize: 20,
    textAlign: 'center'
  }
});

export default HistoryScreen;
