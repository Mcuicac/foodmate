import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { Container, Content } from 'native-base'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import global from '../../global';
//npm install yarn -g
//expo install expo-image-.


export default class Edit extends Component {
  state = {
    isLoading: true,
    image: null,
    user: null,
    data: [],
    username: "",
    bio: "",
    proimage: null,
    loading: false,
  };

  componentWillMount() {

    global.firebase.auth().onAuthStateChanged(
      (user) => this.setState({ user: user })
    );
    global.firebase
      .database()
      .ref('user/' + global.userkey)
      .on('value', snapshot => {
        var data = snapshot.val();
        this.setState({
          username: data.username,
          bio: data.bio,
        });
      });
    this.getavatar(global.userkey);
    this.getPermissionAsync();
  };

  getavatar(image) {
    var ref = global.firebase.storage().ref().child("proimage/" + image + ".png");
    ref.getDownloadURL()
      .then((url) => {
        //from url you can fetched the uploaded image easily
        this.setState({ proimage: url });
      })
      .catch((e) => {
        console.log('getting downloadURL of image error => ', e);
        this.setState({ proimage: "https://firebasestorage.googleapis.com/v0/b/testfirebase-4f3dc.appspot.com/o/proimage%2Fblank-profile-picture.png?alt=media&token=07a92159-e50b-42cd-b9fd-5e1a4701b257" })
      });
  }

  confirm_pressed() {
    this.props.navigation.goBack('Profile');

  };

  onSavePress() {
    global.firebase.database().ref('user/' + global.userkey).update(
      {
        username: this.state.username,
        bio: this.state.bio,
        proimage: this.state.proimage,
      }
    )
      .then(() => {
        this.setState({ error: '', loading: false });
        this.confirm_pressed();
      })
      .catch(() => {
        this.setState({ error: '', loading: false });
        alert("Error")
      });
  }

  renderButtonOrLoading() {
    if (this.state.loading) {
      return <Text>Loading</Text>
    }
    return <TouchableOpacity
      style={styles.loginBtn}
      onPress={this.onSavePress.bind(this)}>
      <Text> Save </Text>
    </TouchableOpacity>
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  upload = async (uri, imageName) => {

    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = global.firebase.storage().ref().child("proimage/" + imageName + ".png");
    ref.getDownloadURL()
      .then((url) => {
        //from url you can fetched the uploaded image easily
        this.setState({ proimage: url });
      })
      .catch((e) => console.log('getting downloadURL of image error => ', e));
    return ref.put(blob);
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.upload(result.uri, global.userkey)
        .catch((error) =>
          console.log(error));
      this.setState({
        image: result.uri
      });
    }

    console.log(result);

  };

  render() {

    let image = this.state.proimage;

    return (
      <Container style={{ flex: 1, backgroundColor: 'white' }}>
        <Content>
          <View>
            <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
              <ImageBackground
                style={{ width: 90, height: 90, borderRadius: 45 }}
                imageStyle={{ borderRadius: 45 }}
                key={Date.now()}
                source={image && { uri: image }}>
                {image && <Image
                  source={{ uri: image }}
                  style={{ width: 90, height: 90, borderRadius: 45 }} />}
              </ImageBackground>
            </View>
            <Text
              onPress={this._pickImage}
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#FBAF02',
                alignSelf: 'center'
              }}>
              Change Profile Photo
                        </Text>

            <View
              style={{
                marginVertical: 20,
                borderBottomColor: '#ebe6e6',
                borderBottomWidth: 1
              }} />

            <View style={{ flex: 1, flexDirection: 'column' }}>

              <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                <Text style={{ fontSize: 16, paddingLeft: 20, paddingRight: 50 }}>Username</Text>
                <TextInput
                  style={{ fontSize: 16, width: '60%', paddingBottom: 15 }}
                  value={this.state.username}
                  placeholder='Username'
                  borderBottomColor='#ebe6e6'
                  borderBottomWidth="1"
                  onChangeText={username => this.setState({ username })}
                  clearButtonMode={true} />
              </View>

              <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                <Text style={{ fontSize: 16, paddingLeft: 20, paddingRight: 100 }}>Bio</Text>
                <TextInput
                  style={{ fontSize: 16, width: '60%', paddingBottom: 15 }}
                  placeholder="Add bio to your profile"
                  value={this.state.bio}
                  borderBottomColor='#ebe6e6'
                  borderBottomWidth="1"
                  onChangeText={bio => this.setState({ bio })}
                  clearButtonMode={true} />
              </View>

              <Text
                onPress={() => this.props.navigation.navigate('Personal Information')}
                style={{
                  fontSize: 16,
                  color: '#FBAF02',
                  padding: 20
                }}>
                Personal Information Settings
                        </Text>
              <View
                style={{
                  alignItems: "center",
                }}>
                {this.renderButtonOrLoading()}
              </View>

            </View>

          </View>
        </Content>
      </Container>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
})
