import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import homeStyles from '../CSS/HomeStyle';

class Home extends Component {

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
      <View style={homeStyles.mainContainer}>
        <View style={homeStyles.btn}>
            <TouchableHighlight onPress={ () => this._navigate('Activity') }>
              <Text>
                Gear Seeker
              </Text>
            </TouchableHighlight>
        </View>
        <View style={homeStyles.btn}>
            <TouchableHighlight onPress={ () => this._navigate('Post') }>
              <Text>
                Gear Provider
              </Text>
            </TouchableHighlight>
        </View>
      </View>
    );
  }
}

module.exports = Home