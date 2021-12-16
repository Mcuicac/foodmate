import React, { Component} from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';

export default class Members extends Component{
    state = {
        image: null,
      };

    render(){
        let { image } = this.state;
        return(
            <View style={{flex:1, backgroundColor: 'white'}}>
                <View style={{flexDirection:'row'}}>
                <ImageBackground 
                    style={{marginVertical:10, marginLeft:20, marginRight: 15, width:50, height:50, borderRadius:45}}
                    imageStyle={{borderRadius:45}}
                    source={this.props.imageUri}  >
                        {image && <Image source={{ uri: image }} style={{width:50, height:50, borderRadius:45}}/>}
                </ImageBackground>
                <Text style={{alignSelf:'center', fontSize: 16}}>
                    {this.props.name}
                </Text>
                </View>
             </View>
                
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FAF7F0',
    }
})