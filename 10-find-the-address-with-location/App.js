import React, {useState , useEffect} from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {

  const [location, setLocation] = useState({ 'latitude':0, 'longitude':0 });
  const [markers, setMarkers] = useState([]); // {'title':'title', 'description':'description', 'latlng':{'lat':0, 'lng':0}}]);
  const [userAddress, setUserAddress] = useState('')
  const MAPQUEST_KEY = '';
  const GOOGLE_PLACES_API_KEY = ''
  const mapquestUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${MAPQUEST_KEY}`;
  
  useEffect( () => {
    getLocation()
  }, []);

  const getLocation= async() => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission to access location');
    } else {
      let location = await Location.getCurrentPositionAsync({});
      console.log('location coords: ', location.coords)
      setLocation(location.coords);
      getMarkers(location.coords.latitude, location.coords.longitude)
    }
  };

  const getLocationOfPlace = async () => {
    let url = `${mapquestUrl}&location=${userAddress}`;
    let response = await fetch(url);
    let data = await response.json();
    setLocation({
      ...location,
      'latitude': data.results[0].locations[0].latLng.lat,
      'longitude': data.results[0].locations[0].latLng.lng,
    })
    getMarkers(data.results[0].locations[0].latLng.lat, data.results[0].locations[0].latLng.lng);
  }

  const getMarkers = async (lat, lng) => {
    let urlPlaces = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=restaurant&key=${GOOGLE_PLACES_API_KEY}`;
    let responsePlaces = await fetch(urlPlaces);
    let dataPlaces = await responsePlaces.json();
    setMarkers(dataPlaces.results);
  }

  return (
    <View style={styles.container}>
      {location !== null ? 
      <MapView style={styles.map}
        region={{   
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}
      > 
    {markers.length ? markers.map((marker, index) => (
    <Marker
      key={index}
      coordinate={{latitude : marker.geometry.location.lat, longitude : marker.geometry.location.lng}}
      title={marker.name}
      description={marker.vicinity}
    />
    )) : null}
       
      </MapView> : null }

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
              onPress={getLocationOfPlace}
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
