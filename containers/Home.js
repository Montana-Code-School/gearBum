import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import homeStyles from '../CSS/HomeStyle';
import loginPostStyles from '../CSS/LoginPostStyle'

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
        <TouchableOpacity onPress={ () => this._navigate('Activity') }>
          <View style={ loginPostStyles.loginBtn }>
              <Text style={ homeStyles.textWhite }>
                Gear Seeker
              </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => this._navigate('ProfilePage') }>
          <View style={ loginPostStyles.loginBtn }>
              <Text style={ homeStyles.textWhite }>
                Gear Provider
              </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

module.exports = Home