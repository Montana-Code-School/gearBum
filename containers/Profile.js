import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput
} from 'react-native';
import loginPostStyles from '../CSS/LoginPostStyle';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text>
          Provider Home Page
        </Text>
      </View>
    );
  }
}

module.exports = ProfilePage