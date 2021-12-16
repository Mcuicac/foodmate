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
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

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
                    longitude: 121.343778,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="里吉拿Regina Pasta"
                description="open on 11AM-9PM"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.989490,
                    longitude: 121.344279,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="八哥重慶酸辣粉"
                description="open on 11:00–14:00 16:30–21:00"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.989745,
                    longitude: 121.343508,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="小判 拉麵專門店"
                description="open on 	17:00–21:00"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.990220,
                    longitude: 121.344374,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="泰皇泰式料理"
                description="open on 12:00–14:00、17:00–21:00 Every Tuesday close"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988603,
                    longitude: 121.343284,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="品誠豆花店"
                description="open on 13:00–23:00 Every Saturday close"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.990123,
                    longitude: 121.344677,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="11番町豚骨拉麵"
                description="open on 13:00–23:00 Every Saturday close"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988705,
                    longitude: 121.343393,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="晨間廚房銘傳德明店"
                description="open on 06:00–13:00 Every Friday close"
            ></Marker>


            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988510,
                    longitude: 121.343093,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="樂活早午餐"
                description="open on 	07:00–14:00 "
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988909,
                    longitude: 121.343896,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="五味臭臭鍋"
                description="open on 10:00–23:00"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988744,
                    longitude: 121.342951,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="鮮味坊"
                description="open on 11:30–14:00  17:00–21:00"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988648,
                    longitude: 121.343047,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="銘傳麥斯漢堡"
                description="open on 	06:30–14:00"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988823,
                    longitude: 121.342840,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="醇滷味"
                description="open on 	12:00–23:00"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988325,
                    longitude: 121.343382,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="蘿西媽媽漢堡(銘傳店)"
                description="open on 	06:30–13:30"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988563,
                    longitude: 121.343606,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="羅媽媽牛肉麵鍋燒麵"
                description="open on 	11:00–22:00"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988663,
                    longitude: 121.343608,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="大呼過癮臭臭鍋"
                description="open on 	11:00–23:00"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988801,
                    longitude: 121.343739,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="今晚吃雞（銘傳店）"
                description="open on 15:00–03:00"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988435,
                    longitude: 121.343165,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="高雄黑輪大王-桃園銘傳店"
                description="open on 	11:00–23:30"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988221,
                    longitude: 121.343798,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="幸福食堂複合式餐飲"
                description="open on 	07:00–20:00"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988115,
                    longitude: 121.343627,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="香料小廚"
                description="open on 	12:00–14:00  17:00–20:30"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988240,
                    longitude: 121.343492,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="雙醬咖哩"
                description="open on 	11:00–21:00"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988280,
                    longitude: 121.343449,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="有食早午餐Sometimes Brunch"
                description="open on 	07:30–16:00"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988436,
                    longitude: 121.343573,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="韓歐尼"
                description="open on 	11:30–21:30"
            ></Marker>

            <Marker
                style={styles.markerStyle}
                coordinate={{
                    latitude: 24.988739,
                    longitude: 121.343440,
                }}
                image={require('../assets/Map/map_marker.png')}
                title="找兩圓 TWO COINS"
                description="Already closed"
            ></Marker>

        </MapView>





    )
}

const styles = StyleSheet.create({
    mapStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 0,
        //height: Dimensions.get('window').height,
    },
})
