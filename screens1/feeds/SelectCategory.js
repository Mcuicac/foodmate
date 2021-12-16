import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import MultiSelect from 'react-native-multiple-select' //npm i react-native-sectioned-multi-select

const items = [{
  id: '1',
  name: 'American'
}, {
  id: '2',
  name: 'Italian'
}, {
  id: '3',
  name: 'French'
}, {
  id: '4',
  name: 'Spanish'
}, {
  id: '5',
  name: 'Mexican'
}, {
  id: '6',
  name: 'Korean'
}, {
  id: '7',
  name: 'Japanese'
}, {
  id: '8',
  name: 'Chinese'
}, {
  id: '9',
  name: 'Taiwanese',
}, {
  id: '10',
  name: 'Thai',
}, {
  id: '11',
  name: 'Indian',
}, {
  id: '12',
  name: 'Indonesian'
}]

export default class App extends Component {
  state = {
    selectedItems: []
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  }

  render () {
    const { selectedItems } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.multiSelectContainer}>
        <MultiSelect
          items={items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Pick Items"
          onChangeInput={ (text)=> console.log(text)}
          tagRemoveIconColor="#707070"
          tagBorderColor="#707070"
          tagTextColor="#707070"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: 'black' }}
          submitButtonColor="#FBAF02"
          submitButtonText="Submit"
        />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF7F0',
    padding: 20
  },
  multiSelectContainer: {
    height: 550,
    width: '98%',
  }
})
