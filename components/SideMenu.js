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
      <View style={ homeStyles.sideMenuIconContainer }>
       <Image
          source={require('../img/whiteGear.png')} 
          style={ homeStyles.sideMenuIcon } 
        />
      </View>
        <View style={ homeStyles.sideMenuContainer }>
          <TouchableOpacity 
            onPress={ () => this._navigate('ProfilePage')}  
            style={ homeStyles.sideMenuLinks }>
            <Text style={ homeStyles.sideMenuText }>
              My Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={ () => this._navigate()}  
          style={ homeStyles.sideMenuLinks }>
            <Text style={ homeStyles.sideMenuText }>
              Account Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={ () => this._navigate('SearchGear')}  
          style={ homeStyles.sideMenuLinks }>
            <Text style={ homeStyles.sideMenuText }>
              Search Gear
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={ () => this._navigate('Post')}  
          style={ homeStyles.sideMenuLinks }>
            <Text style={ homeStyles.sideMenuText }>
              Rent Gear
            </Text>
          </TouchableOpacity>
         </View> 
      </ScrollView>
    );
  }
}

module.exports = Menu