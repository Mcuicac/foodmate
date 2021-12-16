import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Icon, Container, Content, Button } from 'native-base'
import Events from './Events';
import global from '../../global';
import moment from 'moment'; //npm install moment --save

//npm install native-base
//npm install --save react-native-image-crop-picker

export default class Profile extends Component {

    state = {
        username: null,
        dob: null,
        gender: null,
        bio: null,
        age: null,
        email: null,
        proimage: "",
        currentevent: null,
        created_amount: 0,
        joined_amount: 0,
    };

    getAge() {

        var bd = (moment(this.state.dob, "DD-MM-YYYY").format("YYYY-MM-DD"));
        this.state.age = moment().diff(moment(bd), 'years')
    }

    getavatar(image) {
        var ref = global.firebase.storage().ref().child("proimage/" + image + ".png");
        ref.getDownloadURL()
            .then((url) => {
                //from url you can fetched the uploaded image easily
                this.setState({ proimage: url });
            })
            .catch((e) => {
                console.log('getting downloadURL of image error => ', e);
                this.setState({ proimage: "https://firebasestorage.googleapis.com/v0/b/testfirebase-4f3dc.appspot.com/o/proimage%2Fblank-profile-picture.png?alt=media&token=07a92159-e50b-42cd-b9fd-5e1a4701b257" })
            });
    }

    renderavatar(uri) {
        return (
            <Image
                source={uri && {
                    uri: uri
                }}
                style={{ width: 90, height: 90, borderRadius: 45, resizeMode: 'cover' }}
            />
        )
    }

    geteventinfo(data) {
        var info = [];
        global.firebase
            .database()
            .ref('event/' + data)
            .on('value', snapshot => {
                var item = snapshot.val();
                info.push({
                    image: item.image,
                    title: item.title,
                    member: item.member,
                    date: item.date,
                    location: item.place_name,
                })
            })
        return info;
    }

    componentDidMount() {
        global.firebase
            .database()
            .ref('user/' + global.userkey)
            .on('value', snapshot => {
                var data = snapshot.val();
                var tmpc = [];
                var tmpj = [];
                var tmpcur;
                for (var i in data.createdevent) {
                    data.createdevent[i] = Object.values(data.createdevent[i]);
                    tmpc.push(data.createdevent[i]);
                }
                var created_amount = tmpc.length;
                for (var i in data.joinedevent) {
                    data.joinedevent[i] = Object.values(data.joinedevent[i]);
                    tmpj.push(data.joinedevent[i]);
                }
                var joined_amount = tmpj.length;
                for (var i in data.currentevent) {
                    data.currentevent[i] = Object.values(data.currentevent[i]);
                    tmpcur = this.geteventinfo(data.currentevent[i]);
                }
                this.setState({
                    username: data.username,
                    dob: data.dob,
                    gender: data.gender,
                    bio: data.bio,
                    age: null,
                    currentevent: tmpcur,
                    createdevent: tmpc,
                    created_amount: created_amount,
                    joinedevent: tmpj,
                    joined_amount: joined_amount,
                    email: data.email,
                });
            });
    };

    // currentevent(item) {
    //     console.log(item);
    //     return (

    //         <View style={{ height: 250 }}>
    //             <Events
    //                 imageUri="zx"
    //                 title="abc"
    //                 member="3"
    //                 date="6/8/2020"
    //                 location="Regina" /></View>


    //     );
    // }
    render() {
        this.getAge();
        this.getavatar(global.userkey);
        return (
            <Container style={{ flex: 1, backgroundColor: 'white' }}>
                <Content>
                    <View>
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <View
                                style={{ flex: 1, padding: 10, alignItems: 'center' }}>
                                {this.renderavatar(this.state.proimage)}
                            </View>

                            <View style={{ flex: 3 }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around', padding: 10
                                }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>{this.state.created_amount}</Text>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>
                                            created</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>{this.state.joined_amount}</Text>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>
                                            joined</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16 }}>{this.state.created_amount + this.state.joined_amount}</Text>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>
                                            total</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Button bordered light
                                        onPress={() => { this.props.navigation.navigate('Edit Profile') }}
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
                        {/* <View style={styles.event_container}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                                Current Events</Text>
                        </View>
                        {this.currentevent(this.state.currentevent)} */}
                        <View style={styles.event_container}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                                Created Events
                        </Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#b0b0b0' }}
                                onPress={() => this.props.navigation.navigate('Current Events', { item: this.state.createdevent })}>
                                View All
                        </Text>
                        </View>

                        <View style={{ height: 130 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                <View style={{ width: 480, height: 108, marginLeft: 20 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                        <Image
                                            source={require('../../assets/current_event/3.jpg')}
                                            style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 10, marginRight: 10 }} />

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
                                Joined Events
                        </Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#b0b0b0' }}
                                onPress={() => this.props.navigation.navigate('Past Events', { item: this.state.joinedevent })}>
                                View All
                        </Text>
                        </View>

                        <View style={{ height: 150 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                <View style={{ width: 480, height: 108, marginLeft: 20 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                        <Image
                                            source={require('../../assets/past_event/3.jpg')}
                                            style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 10, marginRight: 10 }} />

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
            </Container >
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
