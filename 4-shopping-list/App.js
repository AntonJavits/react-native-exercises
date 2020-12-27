import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, FlatList, Text, View, Button, TextInput, Alert } from 'react-native'

export default function App() {

  const [itemInput, setItemInput] = useState('')
  const [shoppingList, setShoppingList] = useState([])

  const handleInputChange = (itemInput) => {
    setItemInput(itemInput)
  }

  const addItem = () => {
    (itemInput !== '') && setShoppingList([...shoppingList, {key: itemInput}])
    setItemInput('')
  }

  const clearItems = () => {
    setShoppingList([])
  } 

  return (

    <View style={styles.container}>

      <StatusBar style={styles.statusBar} barStyle={'dark-content'} />

      <View style={styles.titleSection}>
        <Text style={styles.titleHeading}>Shopping list</Text>
      </View>
      
      <View style={styles.bodySection}>
        
        <TextInput
          style={styles.textInputBasic}
          onChangeText={itemInput => handleInputChange(itemInput)}
          value={itemInput}/>

        <View style={styles.buttonGroup}>
          <Button onPress={addItem} title="Add item"/>
          <Button onPress={clearItems} title="Clear"/>
        </View>
        <View>
          <Text style={styles.listHeading}>Shopping List</Text>
          <FlatList
              data={shoppingList}
              renderItem={({item}) =>
                <Text>{item.key}</Text>}
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
  }
})
