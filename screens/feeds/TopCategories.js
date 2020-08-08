import React, { Component} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class TopCategories extends Component{
    render(){
        return(
            <View style={{width:250, height:230, marginLeft:20}}>
                    <View style={{flex:2}}>
                      <Image source={this.props.imageUri}  
                      style={{flex:1, width:null, height:null, resizeMode:'cover', borderRadius:10, marginVertical:10}}/>

                    </View>
                    <View style={{flex:1, paddingLeft:0}}>
                      <Text style={{fontSize:14, fontWeight:'600', marginBottom:3}}>{this.props.name}</Text>
                      <Text style={{fontsize:14, fontWeight:'300', marginBottom:3}}>{this.props.menu}</Text>
                    </View>
                  </View>
        )
    }
}

export default TopCategories;
 
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})