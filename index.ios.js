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
import Post from './containers/Post';
import Login from './containers/Login';
import ProfilePage from './containers/Profile';
import SearchGear from './containers/SearchGear';
import SelectedListing from './containers/SelectedListing';
import SideMenu from './components/SideMenu';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class GearBum extends Component {

  renderScene(route, navigator) {
    const { passProps } = route

    if(route.name == 'Post') {
      return <Post navigator={navigator} {...passProps}  />
    }
    if(route.name == 'Login') {
      return <Login navigator={navigator} {...passProps} />
    }
    if(route.name == 'ProfilePage') {
      return <ProfilePage navigator={navigator} {...passProps} />
    }
    if(route.name == 'SearchGear') {
      return <SearchGear navigator={navigator} {...passProps} />
    }
    if(route.name == 'SelectedListing') {
      return <SelectedListing navigator={navigator} {...passProps}/>
    }
    if(route.name == 'SideMenu') {
      return <SideMenu navigator={navigator} {...passProps}/>
    }
  }

  render() {
    EStyleSheet.build();
    global.___DEV___ = false
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ name: 'SearchGear' }}
        renderScene={ this.renderScene }
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.HorizontalSwipeJump} />
    )
  }
}


AppRegistry.registerComponent('gearBum', () => GearBum);
