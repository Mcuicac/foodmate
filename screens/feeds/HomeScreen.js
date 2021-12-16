import React, { useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import TopCategories from './TopCategories';
import Events from './Events';
import global from '../../global'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }) {

  const [search, setSearch] = useState('');
  const [userPosition, setUserPosition] = useState(null);
  const mapRef = useRef(null);
  const [eventdata, setEventdata] = useState([]);

  useEffect(() => {
    getUserPosition();
  }, []);

  useEffect(() => {
    if (userPosition && mapRef.current) {
      setTimeout(() => {
        mapRef.current.animateToRegion({
          latitude: userPosition.latitude + 0.002,
          longitude: userPosition.longitude - 0.0045,
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

  function updateSearch(value) {
    setSearch(value);
  }

  function item_pressed(item) {
    global.event = item;
    navigation.navigate("Join Event", { item: item });
  }

  function top_pressed(item) {
    navigation.navigate("Top categories list", { item: item });
  }

  useEffect(() => {
    try {
      global.firebase
        .database()
        .ref('event')
        .on('value', (dataSnapshot) => {
          let data = [];
          dataSnapshot.forEach((child) => {
            data.push({
              eventID: child.val().eventID,
              title: child.val().title,
              member: child.val().member,
              date: child.val().date,
              location: child.val().place_name,
              category: child.val().tags,
              eventimage: child.val().image,
            });
          });
          setEventdata(data);
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <SearchBar
            lightTheme={true}
            searchIcon={{ paddingLeft: 5 }}
            inputContainerStyle={{ backgroundColor: 'white', height: 40 }}
            containerStyle={{ backgroundColor: '#f7f7f7', paddingLeft: 20, paddingRight: 20 }}
            inputStyle={{ fontSize: 15 }}
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
            <View styles={{ flex: 1, paddingTop: 20 }}>
              <Text style={styles.titleText}>
                Top Categories
              </Text>

              <View style={{ height: 210 }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>

                  <TopCategories
                    imageUri={require('../../assets/american/1.jpg')}
                    name="American"
                    menu="Hamburger, Fries, Clam Chowder, Deep-Dish Pizza, and more."
                    onPress={() => top_pressed("American")}
                  />
                  <TopCategories
                    imageUri={require('../../assets/italian/1.jpg')}
                    name="Italian"
                    menu="Spaghetti, Lasagna, Risotto, Pizza, Ossobuco, Gelato, and more."
                    onPress={() => top_pressed("Italian")} />
                  <TopCategories
                    imageUri={require('../../assets/french/1.jpg')}
                    name="French"
                    menu="French toast, Ratatouille, Crêpes, Soufflé, Cassoulet, and more."
                    onPress={() => top_pressed("French")} />
                  <TopCategories
                    imageUri={require('../../assets/mexican/1.jpg')}
                    name="Mexican"
                    menu="Burritos, Guacamole, Enchiladas, Quesadillas, Salsa, and more."
                    onPress={() => top_pressed("Mexican")} />
                  <TopCategories
                    imageUri={require('../../assets/korean/1.jpg')}
                    name="Korean"
                    menu="Bulgogi, Bibimbap, Ddukbokki, Kimchi, Japchae, and more."
                    onPress={() => top_pressed("Korean")} />
                  <TopCategories
                    imageUri={require('../../assets/japanese/1.jpg')}
                    name="Japanese"
                    menu="Sushi, Sashimi, Tempura, Soba, Udon, Onigri, Yakitori, and more."
                    onPress={() => top_pressed("Japanese")} />
                  <TopCategories
                    imageUri={require('../../assets/chinese/1.jpg')}
                    name="Chinese"
                    menu="Hotpot, Sichuan Pork, Sweet and Sour Pork, Fried Noodle, and more."
                    onPress={() => top_pressed("Chinese")} />
                  <TopCategories
                    imageUri={require('../../assets/hongkong/1.jpg')}
                    name="Hong Kong"
                    menu="Wontons, Roast Goose, Fish Balls, Har Gow, Chickens' Feet, and more."
                    onPress={() => top_pressed("Hong Kong")} />
                  <TopCategories
                    imageUri={require('../../assets/taiwanese/1.jpg')}
                    name="Taiwanese"
                    menu="Beef Noodles, Dumplings, Minced Pork Rice, Stinky Tofu, and more."
                    onPress={() => top_pressed("Taiwanese")} />
                  <TopCategories
                    imageUri={require('../../assets/thai/1.jpg')}
                    name="Thai"
                    menu="Tom Yum Goong, Som Tum, Pad Thai, Khao Pad, and more."
                    onPress={() => top_pressed("Thai")} />
                  <TopCategories
                    imageUri={require('../../assets/indian/1.jpg')}
                    name="Indian"
                    menu="Biryani, Butter Chicken, Tandoori Chicken, aFlatbread, and more."
                    onPress={() => top_pressed("Indian")} />
                  <TopCategories
                    imageUri={require('../../assets/indonesian/1.jpg')}
                    name="Indonesian"
                    menu="Satay, Fried Rice, Beef Rendang, Sop Buntut, Soto Ayam, and more."
                    onPress={() => top_pressed("Indonesian")} />
                </ScrollView>
              </View>

              <View styles={{ flex: 1, paddingTop: 20 }}>
                <Text style={styles.titleText}>
                  Events
              </Text>
                <FlatList
                  data={eventdata}
                  inverted={true}
                  renderItem={({ item }) =>
                    (
                      <TouchableOpacity
                        style={styles.events}
                        onPress={() => item_pressed(item.eventID)}>
                        <Events
                          imageUri={item.eventimage}
                          title={item.title}
                          member={item.member}
                          date={item.date}
                          location={item.location} />
                      </TouchableOpacity>

                    )}

                />
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View >
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  events: {
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 17,
    color: "black",
    fontWeight: '700',
    textAlign: 'left',
    marginTop: 20,
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
