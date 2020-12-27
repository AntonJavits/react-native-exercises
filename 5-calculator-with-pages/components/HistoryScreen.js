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
              <Text>{item.key}</Text>}
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
});

export default HistoryScreen;
