import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Container, Content } from 'native-base'
import global from '../../global';
import MembersTemplate from './MembersTemplate';

export default class Members extends Component {
    state = {
        image: null,
        members: [],
        username: "",
        proimage: "",
    };

    componentWillMount() {
        var membersinfo = []
        var username, proimage;
        global.firebase
            .database()
            .ref('event/' + global.event + "/members")
            .on('value', snapshot => {
                snapshot.forEach((data) => {
                    var mem = data.val();
                    global.firebase
                        .database()
                        .ref('user/' + mem)
                        .on('value', snapshot => {
                            var v = snapshot.val();
                            username = v.username;
                            proimage = v.proimage;
                        });
                    membersinfo = membersinfo.concat({
                        id: mem,
                        username: username,
                        proimage: proimage
                    });
                });

            })
        this.state.members = this.state.members.concat(membersinfo);
    };

    render() {
        console.log(this.state.members);
        return (
            <Container style={{ flex: 1, backgroundColor: 'white' }}>
                <Content>
                    <Text style={{ marginTop: 15, marginBottom: 10, marginHorizontal: 20, color: 'gray' }}>
                        Event Member(s)
                </Text>
                    <FlatList
                        data={this.state.members}
                        renderItem={({ item }) =>
                            (<MembersTemplate
                                imageUri={item.proimage}
                                name={item.username} />
                            )
                        }

                    />
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
        backgroundColor: '#FAF7F0',
    }
})
