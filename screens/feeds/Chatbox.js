import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { Card, CardItem } from "native-base";
import global from '../../global';

function getuserinfo(data) {
    let info = [];
    global.firebase
        .database()
        .ref('user/' + data)
        .on('value', snapshot => {
            var item = snapshot.val();
            info.push({
                username: item.username,
            })
        })
    return info;
};

const ChatBox = ({ userId, msg, uri }) => {
    let isCurrentUser = userId === global.userkey ? true : false;
    let user = getuserinfo(userId);
    user.map((postData) => {
        user = postData
    })
    return (
        <Card
            transparent
            style={{
                alignSelf: isCurrentUser ? "flex-end" : "flex-start",
            }}
        >
            {isCurrentUser ? (
                <View
                    style={[
                        styles.chatContainer,
                        isCurrentUser && {
                            borderRadius: 15,
                            backgroundColor: "#ffbe29",
                        },
                    ]}
                >
                    <Text
                        style={[styles.chatTxt, isCurrentUser && { color: "#3d1304" }]}
                    >
                        {msg}
                    </Text>
                </View>

            ) : (
                    <View>
                        <Text
                            style={{
                                color: '#3d1304',
                                fontSize: 14,
                                fontWeight: '700',
                                marginHorizontal: 10,
                                marginBottom: 5,
                            }}
                        > {user.username}</Text>
                        <View
                            style={[
                                styles.chatContainer,
                            ]}
                        >

                            <Text
                                style={[styles.chatTxt, isCurrentUser && { color: "white" }]}
                            >
                                {msg}
                            </Text>
                        </View>
                    </View>

                )
            }


        </Card>

    );
};

export default ChatBox;

const styles = StyleSheet.create({
    chatContainer: {
        backgroundColor: "#ffe499",
        marginVertical: -1,
        marginHorizontal: 10,
        borderRadius: 15,
        fontSize: 15,
        color: "black",
        fontWeight: "300",
        padding: 5,
    },
    chatTxt: {
        color: "#3d1304",
        fontSize: 14,
        fontWeight: "400",
        padding: 5,
    },
});
