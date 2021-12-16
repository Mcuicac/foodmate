import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail } from "native-base";

const ShowUsers = ({ name, img, onImgTap, onNameTap }) => {
    return (
        <Card style={styles.cardStyle}>
            <CardItem style={styles.cardItemStyle}>
                <Left>
                    <TouchableOpacity style={[styles.logoContainer]}>
                        {img ? (
                            <Thumbnail source={{ uri: img }} resizeMode="cover" />
                        ) : (
                                <Text style={styles.thumbnailName}>B</Text>
                            )}
                    </TouchableOpacity>

                    <Body>
                        <Text style={styles.profileName}>
                            Bew
                        </Text>
                    </Body>
                </Left>
            </CardItem>
        </Card>
    );
};


const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    cardItemStyle: {
        backgroundColor: 'white',
    },

    logoContainer: {
        height: 60,
        width: 60,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'gray',
    },
    thumbnailName: { fontSize: 30, color: 'white', fontWeight: "bold" },
    profileName: { fontSize: 20, color: 'black', fontWeight: "bold" },
});

export default ShowUsers;
