import React from 'react';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';  //npm install react-native-picker-select
import { StyleSheet, Text, View, Picker, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Button } from 'react-native';
import moment from 'moment';
import global from '../global';
import { Feather } from '@expo/vector-icons';

const gender = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
  {
    label: 'Others',
    value: 'Others',
  },
];

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.inputRefs = {
      selectedGender: null,
      selectedGender0: null,
    };
    this.state = {
      email: "",
      username: "",
      password: "",
      error: '',
      date: "",
      UID: "",
      selectedGender: undefined,
      loading: false,
    };
  }

  state = {
    username: "",
    email: "",
    password: "",
  }


  storeInFirebase() {
    const ref = global.firebase.database().ref('user').push();
    const key = ref.key;
    global.event = key;
    ref.set({
      userID: key,
      UID: this.state.UID,
      username: this.state.username,
      email: this.state.email,
      dob: this.state.date,
      gender: this.state.selectedGender,
      proimage: "https://firebasestorage.googleapis.com/v0/b/testfirebase-4f3dc.appspot.com/o/proimage%2Fblank-profile-picture.png?alt=media&token=07a92159-e50b-42cd-b9fd-5e1a4701b257",
    }
    )
  };

  onConfirmPress() {
    this.setState({ error: '', loading: true });
    if (this.state.username == '') {
      alert('Username is required')
      this.setState({ loading: false });
    }
    else if (this.state.email == '') {
      alert('E-mail is required')
      this.setState({ loading: false });
    }
    else if (this.state.password == '') {
      alert('Password is required')
      this.setState({ loading: false });
    }
    else if (this.state.password.length < 6) {
      alert('Password must contain 6 or more characters')
      this.setState({ loading: false });
    }
    else if (this.state.date == '') {
      alert('Please input Date of birth')
      this.setState({ loading: false });
    }
    else if (this.state.selectedGender == undefined) {
      alert('Please input Gender')
      this.setState({ loading: false });
    }
    else {
      const { email, password } = this.state;
      global.firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(data => {
          this.setState({ UID: data.user.uid })
          this.setState({ error: '', loading: false });
          this.storeInFirebase();
          alert("Please log in");
          this.props.navigation.replace("Log In");
        })
        .catch(() => {
          this.setState({ error: '', loading: false });
          alert("The user with this email is already existed.")
        });

    }
  }

  renderButtonOrLoading() {
    if (this.state.loading) {
      return <Text>Loading</Text>
    }
    return <TouchableOpacity
      style={styles.loginBtn}
      onPress={this.onConfirmPress.bind(this)}>
      <Text> Confirm </Text>
    </TouchableOpacity>
  }

  back() {
    this.props.navigation.goBack("Log In");
  }

  backbutton() {
    return (
      <TouchableOpacity
        onPress={this.back.bind(this)}
        style={{ position: 'absolute', left: 20, top: 40 }}>
        <Feather name='arrow-left' size={24} color='black' />
      </TouchableOpacity>)
  }

  render() {
    const placeholder = {
      label: 'Select gender',
      value: null,
      color: '#9EA0A4',
    };

    return (

      <SafeAreaView style={styles.container}>
        {this.backbutton()}
        <View style={styles.signUpView}>
          <Text style={styles.signUpText}> Sign Up</Text>
        </View>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#707070"
            onChangeText={text => this.setState({ username: text })} />
        </View>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#707070"
            keyboardType="email-address"
            onChangeText={text => this.setState({ email: text })} />
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#707070"
            onChangeText={text => this.setState({ password: text })} />
        </View>

        <DatePicker
          showIcon={false}
          androidMode="spinner"
          style={styles.inputView}
          date={this.state.date}
          mode="date"
          placeholder="Date of Birth"
          format="DD-MM-YYYY"
          maxDate={moment().format('DD-MM-YYYY')}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: {
              backgroundColor: "#FAF7F0",
              borderRadius: 20,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              alignItems: 'flex-start',
            },
            placeholderText: {
              color: "#707070"
            }
          }}
          onDateChange={(date) => {
            this.setState({ date: date });
          }}
        />

        <RNPickerSelect
          placeholder={placeholder}
          items={gender}
          onValueChange={value => {
            this.setState({
              selectedGender: value,
            });
          }}
          onUpArrow={() => {
            this.inputRefs.firstTextInput.focus();
          }}
          onDownArrow={() => {
            this.inputRefs.selectedGender0.togglePicker();
          }}
          style={pickerSelectStyles}
          value={this.state.selectedGender}
          ref={el => {
            this.inputRefs.selectedGender = el;
          }}
        />
        <Text>{this.state.error}</Text>
        {this.renderButtonOrLoading()}
      </SafeAreaView>
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
  inputView: {
    width: "80%",
    backgroundColor: "#FAF7F0",
    borderRadius: 20,
    height: 20,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "black"
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
  buttonText: {
    fontSize: 16,
    color: "white"
  },
  signUpText: {
    fontSize: 18,
    color: "black",
    fontWeight: 'bold',
    marginBottom: 10
  },
  signUpView: {
    paddingBottom: 30,
  },

});

const pickerSelectStyles = StyleSheet.create({
  placeholder: {
    color: '#707070',
  },
  inputIOS: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: "#FAF7F0",
    borderRadius: 20,
    padding: 20,
    fontSize: 15,
    paddingVertical: 12,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: "#FAF7F0",
    borderRadius: 20,
    padding: 20,
    fontSize: 15,
    paddingVertical: 12,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
