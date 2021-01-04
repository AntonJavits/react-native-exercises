import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
// import Constants from 'expo-constants';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('coursedb.db');

export default function App() {
  const [credit, setCredit] = useState('');
  const [title, setTitle] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists course (id integer primary key not null, credits int, title text);');
    });
    updateList();
  }, []);

  // Save course
  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into course (credits, title) values (?, ?);', [parseInt(credit), title]);
    }, null, updateList
    )
  }

  // Update courselist
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from course;', [], (_, { rows }) =>
        setCourses(rows._array)
      );
    });
  }

  // Delete course
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from course where id = ?;`, [id]);
      }, null, updateList
    )
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
      <View style={styles.inputcontainer}>
        <TextInput placeholder='Title' style={styles.input}
          onChangeText={(title) => setTitle(title)}
          value={title} />
        <TextInput placeholder='Credits' keyboardType="numeric" style={styles.input}
          onChangeText={(credit) => setCredit(credit)}
          value={credit} />
        <View style={styles.input}>
          <Button onPress={saveItem} title="Save" />
        </View>
      </View>
      <Text style={{ marginTop: 30, fontSize: 20 }}>Courses</Text>
      <FlatList
        style={styles.listcontainer}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
          <View style={styles.listitem}>
            <Text style={styles.textitem}>{item.title}, {item.credits}</Text>
            <Text style={[styles.textitem, styles.actionitem]}
              onPress={() => deleteItem(item.id)}
            >
              Done
            </Text>
          </View>}
        data={courses}
        ItemSeparatorComponent={listSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20// Constants.statusBarHeight
  },
  inputcontainer: {
    flexDirection: 'column',
    width: 200
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 18,
    borderColor: 'gray',
    borderWidth: 1
  },
  listcontainer: {
    marginLeft: "5%",
    width: 200
  },
  listitem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  textitem: {
    fontSize: 18
  },
  actionitem: {
    color: '#0000ff'
  }
});