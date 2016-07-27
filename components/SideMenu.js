import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  TextInput
} from 'react-native';
import profileStyles from '../CSS/ProfileStyle';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <ScrollView style={ profileStyles.sideMenu } scrollsToTop={false}>
        <View style={ profileStyles.sideMenuBox }>
          <Text>
            Side Menu
          </Text>
        </View>
      </ScrollView>
    );
  }
}

module.exports = Menu