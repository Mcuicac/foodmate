import React, { useLayoutEffect, useState, useEffect, Fragment } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, KeyboardAvoidingView, Keyboard } from 'react-native';
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import global from '../../global';
import ChatBox from './Chatbox';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from "react-native";


const ICON_COLOR = 'white';
const ICON_SIZE = 25;
const { height: deviceHeight, width: deviceWidth } = Dimensions.get(
    "window"
);
const smallDeviceHeight = 650;

function geteventinfo(data) {
    var info = [];
    global.firebase
        .database()
        .ref('event/' + data)
        .on('value', snapshot => {
            info = snapshot.val();
        })
    return info;
}


const Chat = ({ route, navigation }) => {

    const { params } = route;
    const [msgValue, setMsgValue] = useState("");
    const [messeges, setMesseges] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        componentdidmount();
    }, []);

    const componentdidmount = () => {
        try {
            global.firebase
                .database()
                .ref('user/' + global.userkey)
                .on('value', snapshot => {
                    let info = [];
                    let chat = [];
                    let item = snapshot.val();
                    for (var i in item.currentevent) {
                        var tmp = null;
                        var user = [];
                        var v = Object.values(item.currentevent[i]);
                        tmp = geteventinfo(v);
                        info.push({
                            eventid: v.toString(),
                            image: tmp.image,
                            title: tmp.title,
                            member: tmp.member,
                            date: tmp.date,
                            location: tmp.place_name,
                        })
                        for (var i in tmp.chat) {
                            chat.push(tmp.chat[i]);
                        }
                    }
                    info.map((postData) => {
                        setData(postData);
                    })
                    setMesseges(chat.reverse());

                })
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnChange = (text) => {
        setMsgValue(text);
    };

    const handleSend = async () => {
        setMsgValue("");
        if (msgValue) {
            try {
                global.firebase.database().ref('event/' + data.eventid).child('chat').push({
                    sendBy: global.userkey,
                    msg: msgValue,
                })
                componentdidmount();
            } catch (error) {
                return error;
            }
        };
    }

    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                keyboardVerticalOffset={deviceHeight > smallDeviceHeight ? 100 : 70}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={[{ backgroundColor: "white" }]}
            >
                <TouchableWithoutFeedback
                    style={styles.container}
                    onPress={Keyboard.dismiss}
                ><Fragment>
                        <FlatList
                            data={messeges}
                            inverted={true}
                            renderItem={({ item }) =>
                                //console.log(item)
                                <ChatBox
                                    msg={item.msg}
                                    userId={item.sendBy}
                                    uri="https://firebasestorage.googleapis.com/v0/b/testfirebase-4f3dc.appspot.com/o/proimage%2F-MCuHhFSDfWhwRkC-gpO.png?alt=media&token=a9e11d65-0aa5-4d33-a86e-d1282d9943c0"
                                />
                            }
                        />
                    </Fragment>

                    <View
                        style={styles.textboxcontainer}>
                        <TextInput
                            style={styles.inputIOS}
                            placeholder="Send a message"
                            value={msgValue}
                            numberOfLines={2}
                            onChangeText={(text) => handleOnChange(text)}
                        >
                        </TextInput>
                        <TouchableOpacity
                            onPress={() => handleSend()}>
                            <MaterialCommunityIcons
                                name="send"
                                size={ICON_SIZE}
                                color={ICON_COLOR} />
                        </TouchableOpacity>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )

}

export default Chat;


const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    textboxcontainer: {
        height: 50,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "#f0f0f0",
        marginTop: 8,
    },
    inputIOS: {
        width: '85%',
        height: '70%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        fontSize: 15,
        paddingVertical: 12,
        margin: 10,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
})