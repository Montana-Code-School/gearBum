import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class Post extends Component {

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
})
module.exports = Post