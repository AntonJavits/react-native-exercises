import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View, Button, TextInput, Alert } from 'react-native';

export default function App() {

  const [itemInput, setInputItem] = useState('');
  const [ammountInput, setInputAmmount] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  const handleItemChange = (itemInput) => {
    setInputItem(itemInput);
  }
  const handleAmmountChange = (ammountInput) => {
    setInputAmmount(ammountInput);
  }

  const addItem = () => {
    (itemInput !== '') && setShoppingList([...shoppingList, {
      'key': itemInput,
      'title': itemInput,  
      'ammount': ammountInput
      }]);
    setInputItem('');
    setInputAmmount('');
  }

  const clearItems = () => {
    setShoppingList([]);
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };
  return (

    <View style={styles.container}>

      <StatusBar style={styles.statusBar} barStyle={'dark-content'} />

      <View style={styles.titleSection}>
        <Text style={styles.titleHeading}>Shopping list</Text>
      </View>
      
      <View style={styles.bodySection}>
        
        <TextInput
          style={styles.textInputBasic}
          onChangeText={itemInput => handleItemChange(itemInput)}
          value={itemInput}/>
        <TextInput
          style={styles.textInputBasic}
          onChangeText={ammountInput => handleAmmountChange(ammountInput)}
          value={ammountInput}/>

        <View style={styles.buttonGroup}>
          <Button onPress={addItem} title="Add item"/>
          <Button onPress={clearItems} title="Clear"/>
        </View>
        <View>
          <Text style={styles.listHeading}>Shopping List</Text>
          <FlatList
              contentContainerStyle={styles.listRows}
              
              keyExtractor={item => item.key}
              renderItem={({item}) => 
                <View style={styles.listItemRow}>
                  <Text style={styles.listItem}>{item.title}, {item.ammount}</Text>
                  <Text style={styles.itemAction}>Bought</Text>
                </View>}
            data={shoppingList}
            ItemSeparatorComponent={listSeparator}
            />
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
  statusBar: {
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
    justifyContent: 'flex-start',
    marginTop: 50
  },
  buttonGroup: {
    backgroundColor: '#f2f2f2',
    width: 200,
    padding: 10,
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginBottom: 20
  },
  titleHeading: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#707070',
    textTransform: 'uppercase',
    marginTop: 10
  },
  textInputBasic: {
    width: 200,
    borderColor: '#A8A8A8',
    borderWidth: 1,
    padding: 5,
    marginBottom: 10
  },
  listHeading: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
    textAlign: 'center',
    color: 'blue'
  },
  listRows: {
    marginRight: 15,
    marginLeft: 15,
    justifyContent: 'center'
  },
  listItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listItem: {
    fontSize: 20,
    padding: 3,
    marginBottom: 5
  },
  itemAction: {
    fontSize: 20,
    color: '#1e52ff',
    marginLeft: 3,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 5,
    backgroundColor: '#ecedee'
  }
})
