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
import homeStyles from '../CSS/HomeStyle';

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
      <ScrollView style={ homeStyles.sideMenu } scrollsToTop={false}>
        <View style={ homeStyles.sideMenuContainer }>
          <View style={ homeStyles.sideMenuLinks }>
            <Text style={ homeStyles.sideMenuText }>
              My Account
            </Text>
          </View>
          <View style={ homeStyles.sideMenuLinks }>
            <Text style={ homeStyles.sideMenuText }>
              Account Settings
            </Text>
          </View>
          <View style={ homeStyles.sideMenuLinks }>
            <Text style={ homeStyles.sideMenuText }>
              Search Gear
            </Text>
          </View>
          <View style={ homeStyles.sideMenuLinks }>
            <Text style={ homeStyles.sideMenuText }>
              Rent Gear
            </Text>
          </View>
         </View> 
      </ScrollView>
    );
  }
}

module.exports = Menu