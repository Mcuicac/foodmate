import React, { Component} from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, Button, Title } from 'native-base'

class Edit extends Component{
    render(){
        return(
            <Container style={{flex:1, backgroundColor: 'white'}}>
            <Content>
                <View>
                    <Text style={{paddingLeft:20, paddingTop:20, paddingBottom:25, color:'gray'}}>Provide your personal information.</Text>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:16, paddingLeft:20, paddingRight:80}}>Name</Text>
                        <TextInput
                            style={{fontSize: 16, width:'60%', paddingBottom:15}}
                            defaultValue="jenniekim@gmail.com"
                            placeholder='Email'
                            borderBottomColor='#ebe6e6'
                            borderBottomWidth="1"
                            clearButtonMode={true}/>
                        </View>

                        <View style={{flexDirection:'row', paddingTop:20}}>
                        <Text style={{fontSize:16, paddingLeft:20, paddingRight:70}}>Gender</Text>
                        <TextInput
                            style={{fontSize: 16, width:'60%', paddingBottom:15}}
                            defaultValue="Female"
                            placeholder='Gender'
                            borderBottomColor='#ebe6e6'
                            borderBottomWidth="1"
                            clearButtonMode={true}/>
                        </View>

                        <View style={{flexDirection:'row', paddingTop:20}}>
                        <Text style={{fontSize:16, paddingLeft:20, paddingRight:60}}>Birthday</Text>
                        <TextInput
                            style={{fontSize: 16, width:'60%', paddingBottom:15}}
                            defaultValue="January 16, 1996"
                            placeholder="Birthday"
                            borderBottomColor='#ebe6e6'
                            borderBottomWidth="1"
                            clearButtonMode={true}
                            />
                        </View>

                    </View>
                </View>
             </Content>
             </Container>
        )
    }
}

export default Edit;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})