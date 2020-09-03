import React, { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Platform, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import TopCategories from './TopCategories';
import Events from './Events';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      <ScrollView>
      <View>
        <SearchBar
          lightTheme={true}
          searchIcon={{paddingLeft:5}}
          inputContainerStyle={{backgroundColor: 'white', height:40}}
          containerStyle={{ backgroundColor: '#f7f7f7', paddingLeft:20, paddingRight:20}}
          inputStyle={{fontSize:15}}
          //platform={Platform.OS}
          placeholder="Search"
          onChangeText={updateSearch}
          value={search}
          
        />
      </View>

      <Text style={styles.titleText}>Current Location</Text>
      <View style={styles.mapViewContainer}>
        <MapView
          style={styles.mapStyle}
          provider="google"
          ref={mapRef}
          showsUserLocation={true}
          showsMyLocationButton={true}
        />
      </View>
      <View>
        <ScrollView
          scrollEventThrottle={16}>
            <View styles={{flex:1, paddingTop:20}}>
              <Text style={styles.titleText}>
                Top Categories
              </Text>

              <View style={{height:210}}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <TopCategories 
                    imageUri={require('../../assets/american/1.jpg')}
                    name="American"
                    menu="Hamburger, Fries, Clam Chowder, Deep-Dish Pizza, and more."/> 
                  <TopCategories 
                    imageUri={require('../../assets/italian/1.jpg')}
                    name="Italian"
                    menu="Spaghetti, Lasagna, Risotto, Pizza, Ossobuco, Gelato, and more."/>
                   <TopCategories 
                    imageUri={require('../../assets/french/1.jpg')}
                    name="French"
                    menu="French toast, Ratatouille, Crêpes, Soufflé, Cassoulet, and more."/>
                  <TopCategories 
                    imageUri={require('../../assets/mexican/1.jpg')}
                    name="Mexican"
                    menu="Burritos, Guacamole, Enchiladas, Quesadillas, Salsa, and more."/>
                  <TopCategories 
                    imageUri={require('../../assets/korean/1.jpg')}
                    name="Korean"
                    menu="Bulgogi, Bibimbap, Ddukbokki, Kimchi, Japchae, and more."/>
                  <TopCategories 
                    imageUri={require('../../assets/japanese/1.jpg')}
                    name="Japanese"
                    menu="Sushi, Sashimi, Tempura, Soba, Udon, Onigri, Yakitori, and more."/>
                  <TopCategories 
                    imageUri={require('../../assets/chinese/1.jpg')}
                    name="Chinese"
                    menu="Hotpot, Sichuan Pork, Sweet and Sour Pork, Fried Noodle, and more."/>
                  <TopCategories 
                    imageUri={require('../../assets/hongkong/1.jpg')}
                    name="Hong Kong"
                    menu="Wontons, Roast Goose, Fish Balls, Har Gow, Chickens' Feet, and more."/>
                  <TopCategories 
                    imageUri={require('../../assets/taiwanese/1.jpg')}
                    name="Taiwanese"
                    menu="Beef Noodles, Dumplings, Minced Pork Rice, Stinky Tofu, and more."/>
                  <TopCategories 
                    imageUri={require('../../assets/thai/1.jpg')}
                    name="Thai"
                    menu="Tom Yum Goong, Som Tum, Pad Thai, Khao Pad, and more."/>
                  <TopCategories 
                    imageUri={require('../../assets/indian/1.jpg')}
                    name="Indian"
                    menu="Biryani, Butter Chicken, Tandoori Chicken, aFlatbread, and more."/>
                  <TopCategories 
                    imageUri={require('../../assets/indonesian/1.jpg')}
                    name="Indonesian"
                    menu="Satay, Fried Rice, Beef Rendang, Sop Buntut, Soto Ayam, and more."/>
                  </ScrollView>
              </View>
              
              <View styles={{flex:1, paddingTop:20}}>
              <Text style={styles.titleText}>
                Events
              </Text>
              <TouchableOpacity onPress={()=> props.navigation.navigate('Join Event')}>
                <Events
                  imageUri={require('../../assets/italian/2.jpg')}
                  title="I LOVE PASTA"
                  member="4"
                  date="Friday, August 7"
                  location="里吉拿義大利麵 Regina Pasta"
                />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
      </View>
      </ScrollView>
    </View>
  ) 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleText:{
    fontSize:17,
    color:"black",
    fontWeight: '700',
    textAlign:'left',
    marginTop:20,
    paddingHorizontal: 20
  },
  mapStyle: {
    width: '90%',
    height: 180,
    borderRadius: 10
    //width: Dimensions.get('window').width,
    //height: Dimensions.get('window').height,
  },
  mapViewContainer: {
    width: '100%',
    height: 190,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    overflow: 'hidden'
  }
})
