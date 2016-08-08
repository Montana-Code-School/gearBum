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
import {serverUrl} from '../constants/serverConstants';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersid: this.props.usersid,
      toggleFalse: false
    };
  }

  _navigate(name) {
    this.props.navigator.push({
      name: name,
      passProps: {
        name: name,
      }
    })
  }

  logout() {
    this.props.setUsersid(null);
    fetch(serverUrl + "/api/v1/logout", {method: "GET"})
      .then(() => this._navigate('Login'))
  }

  render() {
    return (
      <View style={ homeStyles.sideMenu }>
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
              {this.props.usersid}
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
          <TouchableOpacity 
          onPress={ () => this.logout()}  
          style={ homeStyles.sideMenuLinks }>
            <Text style={ homeStyles.sideMenuText }>
              Logout
            </Text>
          </TouchableOpacity>
         </View> 
      </View>
    );
  }
}

module.exports = Menu