import React, {useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {

  const [address, setAddress] = useState('');
  const [location, setLocation] = useState({'lat':0,'lng':0});
  const [userAddress, setUserAddress] = useState('Helsinki')
  const mapquestKey = 'moHod1yGLgoaOGVdkL0ePy0XitjfVxVt';
  const mapquestUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${mapquestKey}`;
  
  const getLocation = async () => {
    let url = `${mapquestUrl}&location=${userAddress}`;
    let response = await fetch(url);
    let data = await response.json();
    setLocation({   
      ...location,
      lat: data.results[0].locations[0].latLng.lat,
      lng: data.results[0].locations[0].latLng.lng,
    })
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        region={{   
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}
        >
        <Marker coordinate={{
          latitude: location.lat,
          longitude: location.lng}}
          title={userAddress}
        />
      </MapView>

      <View style={styles.controls}>
          <TextInput
            style={styles.textInputBasic}
            placeholder={'Enter address'}
            onChangeText={userAddress => setUserAddress(userAddress)}
            value={userAddress}
          />
          <View style={styles.searchBtnView}>
            <Button
              style={styles.searchBtn}
              onPress={getLocation}
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
