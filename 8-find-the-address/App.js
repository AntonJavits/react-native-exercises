import React, {useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {

  const [address, setAddress] = useState('');

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        initialRegion={{
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
      }} >
        <Marker coordinate={{
          latitude:60.201373,
          longitude: 24.934041}}
          title='Haaga-Helia'
        />
      </MapView>

      <View style={styles.controls}>
          <TextInput
            style={styles.textInputBasic}
            placeholder={'Enter address'}
            onChange={address => setAddress(address)}
            value={address}
          />
          <View style={styles.searchBtnView}>
            <Button
              style={styles.searchBtn}
              onPress={true}
              title={'Show'}
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
  map: {
    flex: 6,
    height: '100%',
    width: '100%'
  },
  controls: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textInputBasic: {
    width: 300,
    borderColor: '#A8A8A8',
    fontSize: 15,
    borderWidth: 1,
    padding: 5,
    marginBottom: 7
  },
  searchBtnView: {
    width: 150,
  }
});
