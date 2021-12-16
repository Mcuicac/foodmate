import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableHighlight } from "react-native";
import Events from './Events';
import { TouchableOpacity } from 'react-native-gesture-handler';
import global from '../../global'

export default class CurrentEvents extends React.Component {
  state = {
    data: this.props.route.params.item,
    eventdata: null,
  }

  geteventinfo(data) {
    var item = null;
    global.firebase
      .database()
      .ref('event/' + data)
      .on('value', snapshot => {
        item = snapshot.val();
      })
    return item;
  }

  item_pressed(item) {
    global.event = item;
    this.props.navigation.navigate("Join Event", { item: item });
  }

  componentDidMount() {
    var tmp = [];
    for (var i in this.state.data) {
      var itemid = (this.state.data[i]);
      var info = this.geteventinfo(itemid);
      tmp.push(info);

    }
    this.setState({
      eventdata: tmp,
    });
  }

  ListEmptyComponent() {
    return (
      <View style={styles.container}>

        <Text style={{
          fontSize: 17,
          color: "black",
          fontWeight: '400',
          lineHeight: '40',
          margin: 60,
          paddingHorizontal: 20,
          textAlign: 'center'
        }}>
          There are no available events.</Text>
      </View>

    );
  }
  render() {
    console.log(this.state.eventdata);
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.eventdata}
          ListEmptyComponent={this.ListEmptyComponent()}
          renderItem={({ item }) =>
            (
              <TouchableOpacity
                style={styles.events}
                onPress={() => this.item_pressed(item.eventID)}
              >
                <Events
                  imageUri={item.image}
                  title={item.title}
                  member={item.member}
                  date={item.date}
                  location={item.location} />
              </TouchableOpacity>

            )}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headertext: {
    padding: 10,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    flexDirection: 'row',
    flex: 1,
    padding: 5,
    height: 42,
    alignItems: 'center',
  },
});
