import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Icon, Container, Content, Button } from 'native-base'
import global from '../../global';
import moment from 'moment'; //npm install moment --save

//npm install native-base
//npm install --save react-native-image-crop-picker


export default class Profile extends Component {

    state = {
        data: [],
        user: null,
        username: null,
        dob: null,
        gender: null,
        bio: null,
        age: null,
        email: null,

    };

    componentDidMount() {
        global.firebase.auth().onAuthStateChanged(
            (user) => this.setState({ user: user })
        );
        global.firebase
            .database()
            .ref('user/' + global.userkey)
            .on('value', snapshot => {
                var data = snapshot.val();
                console.log(data);
                this.setState({
                    username: data.username,
                    dob: data.dob,
                    gender: data.gender,
                    bio: data.bio,
                    age: null,
                    email: data.email,
                });
            });
    };

    getAge() {
        var bd = (moment(this.state.dob, "DD-MM-YYYY").format("YYYY-MM-DD"));
        this.state.age = moment().diff(moment(bd), 'years')
    };


    render() {
        this.getAge();
        return (
            <Container style={{ flex: 1, backgroundColor: 'white' }}>
                <Content>
                    <View>
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
                                <Image source={require('../../assets/me.jpg')}
                                    style={{ width: 90, height: 90, borderRadius: 45 }} />
                            </View>
                            <View style={{ flex: 3 }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around', padding: 10
                                }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>4</Text>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>
                                            created</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>10</Text>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>
                                            joined</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>14</Text>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>
                                            total</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Button bordered light
                                        onPress={() => this.props.navigation.navigate('Edit Profile')}
                                        style={{ flex: 3, marginLeft: 10, marginRight: 10, justifyContent: 'center', height: 40 }}>
                                        <Text>Edit Profile</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>

                        <View style={{ paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize', }}>{this.state.username}</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{this.state.gender}, {this.state.age}</Text>
                            <Text style={{ fontSize: 14, paddingTop: 5, paddingBottom: 15 }}>{this.state.bio}</Text>
                        </View>

                        <View
                            style={{
                                borderBottomColor: '#ebe6e6',
                                borderBottomWidth: 1
                            }} />

                        <View style={styles.event_container}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                                Current Events
                        </Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#b0b0b0' }}
                                onPress={() => this.props.navigation.navigate('Current Events')}>
                                View All
                        </Text>
                        </View>

                        <View style={{ height: 130 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                <View style={{ width: 350, height: 120, marginLeft: 20 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                        <Image
                                            source={require('../../assets/current_event/1.jpg')}
                                            style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 10, marginRight: 10 }} />
                                        <Image
                                            source={require('../../assets/current_event/2.jpg')}
                                            style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 10, marginRight: 10 }} />
                                    </View>
                                </View>
                            </ScrollView>
                        </View>

                        <View style={styles.event_container}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                                Past Events
                        </Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#b0b0b0' }}
                                onPress={() => this.props.navigation.navigate('Past Events')}>
                                View All
                        </Text>
                        </View>

                        <View style={{ height: 150 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                <View style={{ width: 350, height: 120, marginLeft: 20 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                        <Image
                                            source={require('../../assets/past_event/1.jpg')}
                                            style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 10, marginRight: 10 }} />
                                        <Image
                                            source={require('../../assets/past_event/2.jpg')}
                                            style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 10, marginRight: 10 }} />
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    event_container: {
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

})
