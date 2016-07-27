/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Navigator,
  Image
} from 'react-native';
import Filter from './containers/Filter';
import Home from './containers/Home';
import Post from './containers/Post';
import Login from './containers/Login';
import ProfilePage from './containers/Profile';
import FindGear from './containers/FindGear';
import SelectedListing from './containers/SelectedListing';

export default class GearBum extends Component {

  renderScene(route, navigator) {
    if(route.name == 'Home') {
      return <Home navigator={navigator} {...route.passProps}  />
    }
    if(route.name == 'Filter') {
      return <Filter navigator={navigator} {...route.passProps}  />
    }
    if(route.name == 'Post') {
      return <Post navigator={navigator} {...route.passProps}  />
    }
    if(route.name == 'Login') {
      return <Login navigator={navigator} {...route.passProps} />
    }
    if(route.name == 'ProfilePage') {
      return <ProfilePage navigator={navigator} {...route.passProps} />
    }
    if(route.name == 'FindGear') {
      return <FindGear navigator={navigator} {...route.passProps} />
    }
    if(route.name == 'SelectedListing') {
      return <SelectedListing navigator={navigator} {...route.passProps} />
    }
  }

  render() {
    global.___DEV___ = false
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ name: 'FindGear' }}
        renderScene={ this.renderScene }
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.HorizontalSwipeJump} />
    )
  }
}


AppRegistry.registerComponent('gearBum', () => GearBum);
