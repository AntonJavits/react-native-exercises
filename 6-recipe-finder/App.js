
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {

  const[resultOfSearch, setResultOfSearch] = useState([]);
  const[keyword, setKeyword] = useState('');

  const searchPressed = async () => {
    let url = `http://www.recipepuppy.com/api/?i=${keyword}`;
    let response = await fetch(url);
    let data = await response.json();
    setResultOfSearch(data.results);
  }

  const FlatListItem = ({item}) => (
    <View style={styles.flatListItem}>
      <Image
        style={styles.flatListImg}
        source={{ uri: item.thumbnail ? item.thumbnail : 'https://via.placeholder.com/300/09f/fff.png' }}
      />
      <Text style={styles.flatListItemText}>{item.title}</Text>
    </View>
  );

  const ListSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };

  return (

    <View style={styles.container}>

      <StatusBar style={styles.statusBar} barStyle={'dark-content'} />

      <View style={styles.titleSection}>
        <Text style={styles.titleHeading}>Recipe finder</Text>
      </View>

      <View style={styles.resultsSection}>
        <FlatList 
          keyExtractor={(item) => item.title} 
          renderItem={FlatListItem} 
          ItemSeparatorComponent={ListSeparator} 
          data={resultOfSearch} 
        />  
      </View>
      
      <View style={styles.inputsSection}>
        <TextInput
          placeholder={'Search keyword: '}
          style={styles.textInputBasic}
          onChangeText={keyword => setKeyword(keyword)}
          value={keyword}/>
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
    flex: 6,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderBottomColor: '#A8A8A8',
    marginTop: 10,
    borderBottomWidth: 1
  },
  inputsSection: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
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
    marginRight: 5
  },
  flatListItem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eeeff0',
    paddingRight: 5,
    marginRight: 15,
    marginLeft: 15,
  },
  flatListImg: {
    width: 70,
    height: 70,
    marginRight: 5
  },
  flatListItemText: {
    flexShrink: 1,
    marginTop: 3,
    marginRight: 7,
    marginBottom: 3,
    marginLeft: 4,
    fontSize: 18,
    color: '#374248'
  },
  separator: {
    height: 10,
    width: "100%",
    backgroundColor: '#FFFFFF'
  }
});

