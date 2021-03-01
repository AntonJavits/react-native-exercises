import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms'
import { StyleSheet, FlatList, Text, View, Button, TextInput } from 'react-native'


const Item = ({ name }) => (
  <View>
    <Text>{name}</Text>
  </View>
);

const renderItem = ({ item }) => <Item name={item.name} />;

export default function App() {
  const [myContacts, setMyContacts] = useState({});
  
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setMyContacts(data);
        console.log(data);
      }
    }
  }

/*   const sendSMS = async () => {
    const isSMSAvailable = await SMS.isAvailableAsync();

    if (isSMSAvailable && contact.phoneNumbers.length > 0) {
      const { result } = await SMS.sendSMSAsync(
      [contact.phoneNumbers[0].number],
      'Hello ' + contact.name
      )
    }
  } */
  return (
    <View style={styles.container}>

      <StatusBar style={styles.statusBar} barStyle={'dark-content'} />

      <View style={styles.titleSection}>
        <Text style={styles.titleHeading}>Contacts</Text>
      </View>
      
      <View style={styles.bodySection}>
      
        <View style={styles.resultsSection}>
    
          <FlatList 
            data={myContacts}
            renderItem={renderItem}
            keyExtractor={item => item.id}
           />

        </View>

        <View style={styles.controlsSection}>
          <Button title="Get Contacts" onPress={getContacts} />
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
  titleHeading: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#707070',
    textTransform: 'uppercase',
    marginTop: 10
  },
  bodySection: {
    flex: 5.3,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  resultsSection: {
    flex: 3,
    marginTop: 30
  },
  controlsSection: {
    flex: 1,
  }
});
