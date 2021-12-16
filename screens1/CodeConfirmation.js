import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  state={
    code:"",
  }
  render(){
    return (
        <View style={styles.container}>
             <Text style={styles.titleText}>Enter Confirmation Code</Text>
             <Text style={styles.baseText}>Enter the 6-digit code we sent to your email.</Text>
        <TouchableOpacity>
          <Text onPress={() => this.props.navigation.navigate('Forgot Password')}
          style={styles.buttonText}>Request a new one. </Text>
        </TouchableOpacity>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Code Confirmation" 
            placeholderTextColor="#707070"
            onChangeText={text => this.setState({code:text})}/>
        </View>
        <TouchableOpacity style={styles.button}>
        <Text onPress={() => this.props.navigation.navigate('Log In')}
        style={styles.loginText}>
            Next
        </Text>
        </TouchableOpacity>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView:{
    width:"80%",
    backgroundColor:"#FAF7F0",
    borderRadius:20,
    height:50,
    marginTop:60,
    marginBottom:0,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black"
  },
  button:{
    width:"80%",
    backgroundColor:"#FBAF02",
    borderRadius:20,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
  },
  titleText:{
    fontSize:20,
    color:"black",
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom:10,
    paddingHorizontal: "10%"
  },
  baseText:{
    fontSize:14,
    color:"black",
    textAlign:'center',
    marginBottom:10,
    paddingHorizontal: "10%"
  },
  buttonText:{
    fontSize:14,
    color:"#FBAF02",
    textAlign:'center'
  }
});
