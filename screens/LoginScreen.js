import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import global from '../global';

export default class LoginScreen extends React.Component {
  state = {
    email: "",
    password: "",
    user: null,
  };

  componentDidMount() {
    global.firebase.auth().onAuthStateChanged(
      (user) => this.setState({ user: user })
    );
  }

  login_pressed() {
    global.user = this.state.user;
    console.log(global.user);
    var usersRef = global.firebase.database().ref('user');
    usersRef.orderByChild('UID').equalTo(global.user.uid).on("value", function (snapshot) {
      console.log(snapshot.val());
      snapshot.forEach(function (data) {
        global.userkey = data.key;
      });
    });
    this.props.navigation.replace("Foodmate");
  };

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>foodmate</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="E-mail"
            placeholderTextColor="#707070"
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })} />
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#707070"
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })} />
        </View>
        <TouchableOpacity>
          <Text onPress={() => this.props.navigation.navigate('Forgot Password')}
            style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.login()}>
          <Text>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={() => this.props.navigation.navigate('Sign Up')}
            style={styles.signUpText}>Sign Up
        </Text>
        </TouchableOpacity>

      </View>
    );
  }

  async login() {
    try {
      await global.firebase.auth().signInWithEmailAndPassword(
        this.state.email,
        this.state.password,
      );
      { this.login_pressed() };
    } catch (error) {
      alert(error);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: 'black',
    marginBottom: 40,
    letterSpacing: 3
  },
  inputView: {
    width: "80%",
    backgroundColor: "#FAF7F0",
    borderRadius: 20,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "black"
  },
  forgot: {
    color: "#FBAF02",
    fontSize: 10,
    marginLeft: 200
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#FBAF02",
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 10
  },
  signUpText: {
    fontSize: 13,
    color: "#FBAF02"
  }
});
