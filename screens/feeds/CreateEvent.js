import React from 'react';
import DatePicker from 'react-native-datepicker'; //npm install react-native-datepicker --save
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import moment from 'moment'; //npm install moment --save
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';  //npm install react-native-picker-select

const tags = [{
  label: 'American',
  value: 'American'
}, {
  label: 'Italian',
  value: 'Italian'
}, {
  label: 'French',
  value: 'French'
}, {
  label: 'Spanish',
  value: 'Spanish'
}, {
  label: 'Mexican',
  value: 'Mexican'
}, {
  label: 'Korean',
  value: 'Korean'
}, {
  label: 'Japenese',
  value: 'Japanese'
}, {
  label: 'Chinese',
  value: 'Chinese'
}, {
  label: 'Taiwanese',
  value: 'Taiwanese',
}, {
  label: 'Thai',
  value: 'Thai',
}, {
  label: 'Indian',
  value: 'Indian',
}, {
  label: 'Indonesian',
  value: 'Indonesian'
}]

const member = [{
  label: '1',
  value: '1'
}, {
  label: '2',
  value: '2'
}, {
  label: '3',
  value: '3'
}, {
  label: '4',
  value: '4'
}, {
  label: '5',
  value: '5'
}]

export default class App extends React.Component {
    constructor(){
        super()

        this.inputRefs = {
          selectedTag: null,
          selectedTag0: null,
          selectedMember: null,
          selectedMember0: null,
        };

        this.state = {
            isVisible: false,
            selectedTag: undefined,
            selectedMember: undefined,
        }
    }

    handlePicker = () => {
        this.setState({
            isVisible: false
        })
    }

    hidePicker = () => {
        this.setState({
            isVisible: false
        })
    }

    state = {
    title: "",
    desc: "",
  }

  render() {
    const placeholder = {
      label: 'Category',
      value: null,
      color: '#9EA0A4'
    }

    const placeholder_2 = {
      label: 'Members',
      value: null,
      color: '#9EA0A4'
    }

    return (

      <SafeAreaView style={styles.container}>
        <View style={styles.signUpView}>
          <Text style={styles.signUpText}> Create Event</Text>
        </View>

        <RNPickerSelect
          placeholder={placeholder}
          items={tags}
          onValueChange={value => {
            this.setState({
              selectedTag: value,
            });
          }}
          onUpArrow={() => {
            this.inputRefs.firstTextInput.focus();
          }}
          onDownArrow={() => {
            this.inputRefs.selectedTag0.togglePicker();
          }}
          style={pickerSelectStyles}
          value={this.state.selectedTag}
          ref={el => {
            this.inputRefs.selectedTag = el;
          }}
        />

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Title"
            placeholderTextColor="#707070"
            onChangeText={text => this.setState({ title: text })} />
        </View>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Description"
            placeholderTextColor="#707070"
            onChangeText={text => this.setState({ desc: text })} />
        </View>

        <DatePicker
          showIcon={false}
          androidMode="spinner"
          style={styles.inputView}
          date={this.state.date}
          mode="datetime"
          placeholder="Date and time"
          format="MMMM D, h:mm A"
          minDate={moment().format('MMMM D, h:mm A')}
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
          placeholder={placeholder_2}
          items={member}
          onValueChange={value => {
            this.setState({
              selectedMember: value,
            });
          }}
          onUpArrow={() => {
            this.inputRefs.firstTextInput.focus();
          }}
          onDownArrow={() => {
            this.inputRefs.selectedMember0.togglePicker();
          }}
          style={pickerSelectStyles}
          value={this.state.selectedMember}
          ref={el => {
            this.inputRefs.selectedMember = el;
          }}
        />

        <View style={styles.inputView} >
          <Text
            style={styles.locationText}
            onPress={() => this.props.navigation.navigate('Choose Restaurant')}>
              Restaurant
            </Text>
        </View>
        
        <TouchableOpacity
          style={styles.loginBtn}>
          <Text> Confirm </Text>
        </TouchableOpacity>
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
    marginTop: 20,
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
    marginTop: 10,
    marginBottom: 10
  },
  signUpView: {
    paddingBottom: 30,
  },
  locationText:{
    height: 20,
    color: "#707070"
  }
});

const pickerSelectStyles = StyleSheet.create({
  placeholder: {
    color: '#707070',
    marginBottom: 20,
    fontSize: 14,
  },
  inputIOS: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: "#FAF7F0",
    borderRadius: 20,
    padding: 20,
    fontSize: 15,
    paddingVertical: 12,
    marginBottom: 20,
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
    marginBottom: 20,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
