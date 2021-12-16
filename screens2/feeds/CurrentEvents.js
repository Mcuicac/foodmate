import React from 'react';
import { StyleSheet, View, Platform, ScrollView } from 'react-native';
import Events from './Events';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HomeScreen(props) {
  
  return (
    <View style={styles.container}>
      <ScrollView>      
              <TouchableOpacity onPress={()=> props.navigation.navigate('View Event')}>
                <Events
                  imageUri={require('../../assets/current_event/1.jpg')}
                  title="I LOVE PASTA"
                  member="4"
                  date="Friday, August 7"
                  location="里吉拿義大利麵 Regina Pasta"
                />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> props.navigation.navigate('View Event')}>
                <Events
                  imageUri={require('../../assets/current_event/2.jpg')}
                  title="Korean Food"
                  member="4"
                  date="Friday, August 9"
                  location="Unni's Korean Kitchen"
                />
                </TouchableOpacity>
          </ScrollView>
    </View>
  ) 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
