import React, { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function HomeScreen(props) {
  const [search, setSearch] = useState('');
  const [userPosition, setUserPosition] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    getUserPosition();
  }, []);

  useEffect(() => {
    if (userPosition && mapRef.current) {
      setTimeout(() => {
        mapRef.current.animateToRegion({
          latitude: userPosition.latitude,
          longitude: userPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, 800);
      }, 100);
    }
  }, [userPosition, mapRef]);

  async function getUserPosition() {
    try {
      await Location.requestPermissionsAsync();
      const position = await Location.getCurrentPositionAsync({});

      console.log({ position })
      setUserPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }
    catch (e) {
      throw e;
    }
  }

  function updateSearch(value) {
    setSearch(value);
  }

  return (
    <View style={styles.container}>
      <View>
        <SearchBar
          lightTheme={true}
          round={true}
          platform={Platform.OS}
          placeholder="Search"
          onChangeText={updateSearch}
          value={search}
        />
      </View>

      <View style={styles.mapViewContainer}>
        <MapView
          style={styles.mapStyle}
          provider="google"
          ref={mapRef}
          showsUserLocation={true}
          showsMyLocationButton={true}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  mapViewContainer: {
    width: '100%',
    height: 400,
    borderRadius: 25
  }
})

