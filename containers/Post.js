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
            onChangeText={(event) => this.setState({category: event.target.value})}
            value={this.state.category}
          />
          <Text>Price</Text>
          <TextInput
            style={ styles.inputBar }
            onChangeText={(event) => this.setState({price: event.target.value})}
            value={this.state.price}
          />
          <Text>Description</Text>
          <TextInput
            style={ styles.inputBar }
            multiline = {true}
            onChangeText={(event) => this.setState({description: event.target.value})}
            value={this.state.description}
          />
          <Text>Location</Text>
          <TextInput
            style={ styles.inputBar }
            onChangeText={(event) => this.setState({location: event.target.value})}
            value={this.state.location}
          />
        </View>
        <Text>
          Post a listing
        </Text>
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