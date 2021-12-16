import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import global from "../global";
import { Feather } from '@expo/vector-icons';

export default class App extends React.Component {
  state = {
    current_password: "",
    new_password: "",
  };

  reauthenticate = (current_password) => {
    var user = global.firebase.auth().currentUser;
    var cred = global.firebase.auth.EmailAuthProvider.credential(
      user.email,
      current_password
    );
    return user.reauthenticateWithCredential(cred);
  };

  onChangePasswordPress = () => {
    this.reauthenticate(this.state.current_password)
      .then(() => {
        var user = global.firebase.auth().currentUser;
        user
          .updatePassword(this.state.new_password)
          .then(() => {
            Alert.alert("Password Reset Successful");
          })
          .catch((error) => {
            Alert.alert(error.message);
          });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{position:'absolute', left:20, top:40}}>
          <Feather name='arrow-left' size={24} color='black'/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.titleText}>Enter a New Password</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.baseText}>
            Reset your password to log in to Foodmate.
          </Text>
        </TouchableOpacity>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            value={this.state.current_password}
            placeholder="Current Password"
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor="#707070"
            onChangeText={(text) => this.setState({ current_password: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            value={this.state.new_password}
            placeholder="New Password"
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor="#707070"
            onChangeText={(text) => this.setState({ new_password: text })}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onChangePasswordPress}
        >
          <Text>Reset Password</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#FAF7F0",
    borderRadius: 20,
    height: 50,
    marginTop: 10,
    marginBottom: 0,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  button: {
    width: "80%",
    backgroundColor: "#FBAF02",
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: "10%",
  },
  baseText: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
    marginBottom: 50,
    paddingHorizontal: "10%",
  },
});
