import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput
} from 'react-native';

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
      <View style={ styles.mainPost }>
        <TouchableHighlight onPress={ () => this.props.navigator.pop() }>
          <Text>
            Home
          </Text>
        </TouchableHighlight>
        <View style={ styles.inputContainer }>
          <Text>Category</Text>
          <TextInput
            style={ styles.inputBar }
            onChangeText={(category) => this.setState({category})}
            value={this.state.category}
          />
          <Text>Price</Text>
          <TextInput
            style={ styles.inputBar }
            onChangeText={(price) => this.setState({price})}
            value={this.state.price}
          />
          <Text>Description</Text>
          <TextInput
            style={ styles.inputBar }
            multiline = {true}
            onChangeText={(description) => this.setState({description})}
            value={this.state.description}
          />
          <Text>Location</Text>
          <TextInput
            style={ styles.inputBar }
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

const styles = StyleSheet.create({
  mainPost: {
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputBar: {
    height: 40,
    width: 350,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    margin: 15,
  },
  inputContainer: {
    alignItems: 'center',
  }
})
module.exports = Post