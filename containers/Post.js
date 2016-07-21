import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  PickerIOS
} from 'react-native';
var PickerItemIOS = PickerIOS.Item;
import loginPostStyles from '../CSS/LoginPostStyle';
//import ImageUpload from './ImageUpload'
// import {component} from './ImageUploadFB' as 
var ImageUploadFB = require('./ImageUploadFB').component

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: ['Bike', 'Snow', 'Camp', 'Boat', 'Golf'],
      category: 'Bike',
      price: '',
      description: '',
      location: ''
    };
  }

  _navigate(name) {
    this.props.navigator.push({
      name: name,
      passProps: {
        name: name
      }
    })
  }

  submitPost(){
    fetch("http://localhost:3000/api/v1/equip/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(this.state)
    }).then(function(response) {
      return response.json()
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  render() {
    return (
      <View style={ loginPostStyles.mainPost }>
        <TouchableHighlight onPress={ () => this.props.navigator.pop() }>
          <Text>
            Home
          </Text>
        </TouchableHighlight>
        <View style={ loginPostStyles.inputContainer }>
          <View>
            <Text>Please choose a gear category:</Text>
              <PickerIOS
                selectedValue={this.state.category}
                onValueChange={(category) => this.setState({category: category})}>
                {this.state.categoryList.map((category, i) => (
                  <PickerItemIOS
                    key={category}
                    value={category}
                    label={category}
                  />
                ))}
              </PickerIOS>
            <Text>{this.state.category}</Text>
          </View>
          <Text>Price</Text>
          <TextInput
            style={ loginPostStyles.inputBar }
            onChangeText={(price) => this.setState({price})}
            value={this.state.price}
          />
          <Text>Description</Text>
          <TextInput
            style={ loginPostStyles.inputBar }
            multiline = {true}
            onChangeText={(description) => this.setState({description})}
            value={this.state.description}
          />
          <Text>Location</Text>
          <TextInput
            style={ loginPostStyles.inputBar }
            onChangeText={(location) => this.setState({location})}
            value={this.state.location}
          />
        <View>
        <ImageUploadFB />
        </View>
        </View>
        <TouchableHighlight onPress={ () => this.submitPost()}>
              <Text>
                Post your listing
              </Text>
            </TouchableHighlight>
      </View>
    );
  }
}

module.exports = Post