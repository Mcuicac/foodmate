import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import global from "../global";

export default function Reset({ navigation }) {
  const [email, setEmail] = useState("");

  const reset = async () => {

    try {
      await global.firebase.auth().sendPasswordResetEmail(email);
      alert("Please check your e-mail");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack("Log In")}
        style={{ position: "absolute", left: 20, top: 40 }}
      >
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.titleText}>Trouble logging in?</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.baseText}>
          Enter your e-mail and we'll send you a link to get back into your
          account.
        </Text>
      </TouchableOpacity>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#707070"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => reset()}>
        <Text>Send Email</Text>
      </TouchableOpacity>
    </View>
  );
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
    marginTop: 60,
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
    marginBottom: 10,
    paddingHorizontal: "10%",
  },
});
