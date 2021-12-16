import React, { Component, useState } from 'react';
import {
  View, Text, StyleSheet, Image, ImageBackground,
  ScrollView, TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { render } from 'react-dom';

const ICON_COLOR = '#FBAF02';
const ICON_SIZE = 24;

const date = (item) => (
  <View style={styles.iconStyle}>
    <MaterialCommunityIcons name="calendar-month" size={ICON_SIZE} color={ICON_COLOR} />
    <View style={styles.alignBox}>
      <Text style={styles.eventTitle}>Date</Text>
      <Text style={styles.eventDetail}>{item}</Text>
    </View>
  </View>
)

const time = (item) => (
  <View style={styles.iconStyle}>
    <MaterialCommunityIcons name="clock-outline" size={ICON_SIZE} color={ICON_COLOR} />
    <View style={styles.alignBox}>
      <Text style={styles.eventTitle}>Time</Text>
      <Text style={styles.eventDetail}>{item}</Text>
    </View>
  </View>
)

const member = (item) => (
  <View style={styles.iconStyle}>
    <MaterialCommunityIcons name="account-circle-outline" size={ICON_SIZE} color={ICON_COLOR} />
    <View style={styles.alignBox}>
      <Text style={styles.eventTitle}>Member</Text>
      <Text style={styles.eventDetail}>{item} members</Text>
    </View>
  </View>
)

const location = (item) => (
  <View style={styles.iconStyle}>
    <MaterialCommunityIcons name="map-marker" size={ICON_SIZE} color={ICON_COLOR} />
    <View style={styles.alignBox}>
      <Text style={styles.eventTitle}>Restaurant</Text>
      <Text style={styles.eventDetail}>{item}</Text>
    </View>
  </View>
)


export default class App extends Component {

  state = {
    data: [],
    user: null,
    tags: null,
    title: null,
    desc: null,
    date: null,
    time: null,
    member: null,
    place_name: null,
  };

  componentDidMount() {
    global.firebase.auth().onAuthStateChanged(
      (user) => this.setState({ user: user })
    );
    global.firebase
      .database()
      .ref('event/-MHqTKt8iS8rtkGGFG0S')
      .on('value', snapshot => {
        var data = snapshot.val();
        console.log(data);
        this.setState({
          tags: data.tag,
          title: data.title,
          desc: data.desc,
          date: data.date,
          time: data.time,
          member: data.member,
          place_name: data.place_name,
        });
      });

  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <ImageBackground
          source={require('../../assets/italian/2.jpg')}
          style={styles.image}
          imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
          <View style={styles.imageOverlay}>
          </View>

          <Text style={styles.title}>{this.state.title}</Text>
          <Text style={styles.description}>{this.state.desc}</Text>

          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{ position: 'absolute', left: 20, top: 40 }}>
            <Feather name='arrow-left' size={24} color='#fff' />
          </TouchableOpacity>

        </ImageBackground>

        <View style={{}}>
          <View style={styles.iconContainer}>
            {date(this.state.date)}
            {time(this.state.time)}
            {member(this.state.member)}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Members")}
              style={{ position: 'absolute', left: '90%', top: '65%' }}>
              <MaterialIcons name="navigate-next" size={30} color='black' />
            </TouchableOpacity>
            {location(this.state.place_name)}

          </View>

          <View style={{ alignItems: 'center', padding: 20 }}>
            <TouchableOpacity style={styles.joinBtn}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FAF7F0',
    padding: 20,
  },
  iconContainer: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 5,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  iconStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingTop: 20,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
    marginBottom: 5,
  },
  eventDetail: {
    fontSize: 14,
    paddingLeft: 10,
  },
  image: {
    height: 300,
    justifyContent: 'flex-end',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  description: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 20,
    marginBottom: 30
  },
  imageOverlay: {
    width: '100%',
    height: 320,
    borderRadius: 20,
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.5,
  },
  joinBtn: {
    width: '80%',
    backgroundColor: '#FBAF02',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
  },
});
