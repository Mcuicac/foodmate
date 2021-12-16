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
                  imageUri={require('../../assets/past_event/1.jpg')}
                  title="Korean Barbecue"
                  member="4"
                  date="Friday, July 12"
                  location="阿豬媽아줌마韓式烤肉ｘ火鍋吃到飽"
                />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> props.navigation.navigate('View Event')}>
                <Events
                  imageUri={require('../../assets/past_event/2.jpg')}
                  title="Friends to share Pizza with"
                  member="2"
                  date="Friday, July 29"
                  location="Movenpick Cafe"
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
