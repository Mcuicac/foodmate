import React, { Component} from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Container, Content } from 'native-base'
import MembersTemplate from './MembersTemplate';

export default class Members extends Component{
    state = {
        image: null,
      };

    render(){
        let { image } = this.state;
        return(
            <Container style={{flex:1, backgroundColor: 'white'}}>
            <Content>
                <Text style={{marginTop: 15, marginBottom: 10, marginHorizontal: 20, color:'gray'}}>
                    Event Member(s)
                </Text>
                <MembersTemplate
                imageUri={require('../../assets/me.jpg')}
                name='Jennie Kim'/>
                 <MembersTemplate
                imageUri={require('../../assets/rose.jpg')}
                name='Rose Park'/>
            </Content>
            </Container>
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