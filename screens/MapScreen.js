import React, { useState, useEffect, useRef,ScrollView  } from 'react';
import MapView,{Marker} from 'react-native-maps';
import { StyleSheet, Dimensions, View } from 'react-native';
import * as Location from 'expo-location';



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

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                provider="google"
                ref={mapRef}
                showsUserLocation={true}
                showsMyLocationButton={true}
            />
            
    <Marker
     style={styles.markerStyle}
     coordinate={{
        latitude: 24.988298,
        longitude : 121.343778,
     }}
     image={require('../assets/Map/marker.png')}
     title="里吉拿Regina Pasta"
     description="open on 11AM-9PM"
    >
        
    </Marker>

     </View>
    )
}

const styles = StyleSheet.create({
    mapStyle: {

        width: Dimensions.get('window').width,
        height: '100%',
        borderRadius: 25
        //height: Dimensions.get('window').height,
    },
    markerStyle:{
        width: 10,
        height: 10
    }
    
})