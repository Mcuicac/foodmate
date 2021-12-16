
import React, { useState } from "react";
import { View, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableHighlight } from "react-native";
import Events from './screens/feeds/Events';
import global from './global'

export default class App extends React.Component {
    state = {
        eventdata: [],
    };

    componentDidMount() {
        global.firebase
            .database()
            .ref('event')
            .on('value', snapshot => {
                var v = snapshot.val();
                var data = [];
                for (var i in v) {
                    v[i].id = i;
                    data.push(v[i]);
                }
                this.setState({
                    eventdata: data,
                });
            });
    }

    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.eventdata}
                    inverted={true}
                    renderItem={({ item }) => this.renderItem(item)}
                />
            </View>
        );
    }

    renderItem(item) {
        console.log(this.state.eventdata)
        return (
            <TouchableHighlight onPress={() => this.item_pressed(item)}>
                <Events
                    imageUri={require('./assets/italian/2.jpg')}
                    title={item.title}
                    member={item.member}
                    date={item.date}
                    location={item.place_name} />
            </TouchableHighlight>
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
