
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import global from '../../global'
import Events from './Events';

export default class TopCategories extends React.Component {
    state = {
        categories: this.props.route.params.item,
        eventdata: null,
    };
    componentDidMount() {
        var event = [];
        global.firebase
            .database()
            .ref('event')
            .on('value', snapshot => {
                snapshot.forEach((data) => {
                    var tmp = data.val();
                    if (tmp.tags == this.props.route.params.item) {
                        event.push(tmp);
                    }
                })
                this.setState({
                    eventdata: event,
                })
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
                    There are no available events.
                    You can create one now!</Text>
                <Button
                    onPress={() => this.props.navigation.navigate("Create Event")}
                    title="Create event >" />
            </View>

        );
    }

    render() {
        console.log(this.state.eventdata);
        // if (this.state.eventdata.length==) {
        //     return (
        //         <View style={styles.container}>

        //             <Text> Nosdxcvdfsx</Text>
        //         </View>
        //     )
        // }
        // else {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.eventdata}
                    ListEmptyComponent={this.ListEmptyComponent}
                    renderItem={({ item }) =>
                        (
                            <TouchableOpacity
                                style={styles.events}
                            //onPress={() => item_pressed(item.eventID)}
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
        backgroundColor: 'white',
    },
})