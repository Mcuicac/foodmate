import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import global from '../../global';
import { Item } from 'native-base';

const ICON_COLOR = '#FBAF02';
const ICON_SIZE = 24;
const FONT_SIZE = 14;
const TITLE_SIZE = 16;

const date = (item) => (
  <View style={styles.iconStyle}>
    <MaterialCommunityIcons name="calendar-month" size={ICON_SIZE} color={ICON_COLOR} />
    <View style={styles.alignBox}>
      <Text style={styles.eventTitle}>Date</Text>
      <Text style={styles.eventDetail}>{item.date}</Text>
    </View>
  </View>
)

const time = () => (
  <View style={styles.iconStyle}>
    <MaterialCommunityIcons name="clock-outline" size={ICON_SIZE} color={ICON_COLOR} />
    <View style={styles.alignBox}>
      <Text style={styles.eventTitle}>Time</Text>
      <Text style={styles.eventDetail}>1.30 PM</Text>
    </View>
  </View>
)

const member = (item) => (
  <View style={styles.iconStyle}>
    <MaterialCommunityIcons name="account-circle-outline" size={ICON_SIZE} color={ICON_COLOR} />
    <View style={styles.alignBox}>
      <Text style={styles.eventTitle}>Member</Text>
      <Text style={styles.eventDetail}>{item.member} members</Text>
    </View>
  </View>
)

const location = () => (
  <View style={styles.iconStyle}>
    <MaterialCommunityIcons name="map-marker" size={ICON_SIZE} color={ICON_COLOR} />
    <View style={styles.alignBox}>
      <Text style={styles.eventTitle}>Restaurant</Text>
      <Text style={styles.eventDetail}>Regina Pasta</Text>
    </View>
  </View>
)

const description = (item) => (
  <View style={styles.iconStyle}>
    <MaterialCommunityIcons name="note-outline" size={ICON_SIZE} color={ICON_COLOR} />
    <View style={styles.alignBox}>
      <Text style={styles.eventTitle}>Description</Text>
      <Text style={styles.eventDesc}>{item.desc}</Text>
    </View>
  </View>
)

export default class App extends Component {

  state = {
    data: [],
    user: null,
    eventid: '-MDzdFKNQQjwVybQUAI8',
  };

  componentDidMount() {
    global.firebase.auth().onAuthStateChanged(
      (user) => this.setState({ user: user })
    );
    global.firebase
      .database()
      .ref('event/' + this.state.eventid)
      .on('value', snapshot => {
        var data = snapshot.val();
        this.setState({
          data: data,
        });
      });
  }

  render() {
    if (this.state.data.length == 0)
      return (
        <View style={styles.container}>
          <Text>Loading</Text>
        </View>
      );

    return (
      <View style={styles.container}>
        <Text style={styles.title}> {this.state.data.title}</Text>

        <View style={styles.iconContainer}>
          {date(this.state.data)}
          {time()}
          {member(this.state.data)}
          {location()}
          {description(this.state.data)}
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FAF7F0',
    padding: 20,
  },
  alignBox: {
    justifyContent: 'flex-start',
  },
  eventTitle: {
    fontSize: TITLE_SIZE,
    fontWeight: 'bold',
    paddingLeft: 10,
    marginBottom: 5,
  },
  eventDetail: {
    fontSize: FONT_SIZE,
    paddingLeft: 10,
  },
  eventDesc: {
    fontSize: FONT_SIZE,
    paddingLeft: 10,
    paddingRight: 20,
  },
  title: {
    fontSize: 20,
    color: "black",
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20
  },
  iconStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 20,
  },
  iconContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
});
