import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class TopCategories extends Component {
    render() {
        return (
            <View style={{ width: 250, height: 230, marginLeft: 20 }}>
                <View style={{ flex: 2, flexDirection: 'row', marginTop: 10 }}>
                    <Image source={this.props.imageUri}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 10, marginRight: 10 }} />
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: '600' }}>{this.props.name}</Text>
                </View>
                <View style={{ flex: 1, paddingTop: 5 }}>
                    <Text style={{ fontSize: 14, fontWeight: '300' }}>{this.props.menu}</Text>
                </View>

            </View>
        )
    }
}

export default TopCategories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
