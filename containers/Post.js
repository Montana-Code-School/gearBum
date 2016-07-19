import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput
} from 'react-native';
import loginPostStyles from '../CSS/LoginPostStyle';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
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
          <Text>Category</Text>
          <TextInput
            style={ loginPostStyles.inputBar }
            onChangeText={(category) => this.setState({category})}
            value={this.state.category}
          />
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