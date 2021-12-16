import React, { Component } from 'react';
import Constants from 'expo-constants';
import { View, Text, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import global from '../../global';
import { TouchableOpacity } from 'react-native-gesture-handler';
//npm install @react-native-community/geolocation

export default class App extends Component {


  render() {
    return (
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          query={{
            key: 'AIzaSyB9FOMICSBQTS3I8QYabTulbXu8YUqXDVs',
            language: 'en',
            components: 'country:tw'
          }}
          onPress={(data = null) => {
            console.log(data);
            if (data.name) {
              global.firebase.database().ref('event/' + global.event).update(
                {
                  place_id: data.place_id,
                  place_name: data.name,
                }
              )
            }
            else {
              global.firebase.database().ref('event/' + global.event).update(
                {
                  place_id: data.place_id,
                  place_name: data.description
                }
              )
            }
          }}
          onFail={error => console.error(error)}

          styles={{
            textInputContainer: {
              backgroundColor: '#FAF7F0',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 40,
              color: "#707070",
              fontSize: 14,
            },
            description: {
              color: "#707070",
            },
            predefinedPlacesDescription: {
              color: "#FBAF02",
              fontSize: 14,
            },
          }}
          currentLocation={true}
          currentLocationLabel='Restaurants nearby'

        />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: "5%",
    backgroundColor: '#FAF7F0',
    padding: 20,
  },
  saveText: {
    alignItems: "center",
    justifyContent: "center",
    height: 15,
    fontSize: 15,
    fontWeight: "700",
    color: "#707070",
    marginLeft: "85%",
    marginBottom: 10,
  },
});
