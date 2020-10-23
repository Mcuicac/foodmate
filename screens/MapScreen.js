import React, { useState, useEffect, useRef } from 'react';
//import MapView from 'react-native-maps';
//import { StyleSheet, Dimensions, View } from 'react-native';
import * as Location from 'expo-location';


import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import MapView, {PROVIDER_GOOGLE,Marker} from "react-native-maps";

export default function MapScreen(props) {
    const [userPosition, setUserPosition] = useState(null);
    const mapRef = useRef(null);

    

    useEffect(() => {
        getUserPosition();

        // props.navigation.navigate('Create');
    }, []);

    useEffect(() => {
        if (userPosition && mapRef.current) {
            setTimeout(() => {
                mapRef.current.animateToRegion({
                    latitude: userPosition.latitude + 0.002,
                    longitude: userPosition.longitude - 0.0015,
                    latitudeDelta: 0.00422,
                    longitudeDelta: 0.000421,
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

    return (
            <MapView
                style={styles.mapStyle}
                provider="google"
                ref={mapRef}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                <Marker
                  style={styles.markerStyle}
                  coordinate={{
                     latitude: 24.988298,
                     longitude : 121.343778,
                  }}
                  image={require('../assets/Map/map_marker.png')}
                  title="里吉拿Regina Pasta"
                  description="open on 11AM-9PM"
                  ></Marker>

                  <Marker
                  style={styles.markerStyle}
                  coordinate={{
                     latitude:  24.989490,
                     longitude : 121.344279,
                  }}
                  image={require('../assets/Map/map_marker.png')}
                  title="八哥重慶酸辣粉"
                  description="open on 11:00–14:00 16:30–21:00"
                  ></Marker>

                  <Marker
                  style={styles.markerStyle}
                  coordinate={{
                     latitude:  24.989745,
                     longitude : 121.343508,
                  }}
                  image={require('../assets/Map/map_marker.png')}
                  title="小判 拉麵專門店"
                  description="open on 	17:00–21:00"
                
            
                  
            />
            </MapView>


            


    )
}

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: '100%',
        borderRadius: 0,
        //height: Dimensions.get('window').height,
    },
})
