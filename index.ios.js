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
import Activity from './containers/Activity';
import Home from './containers/Home';
import Post from './containers/Post';

export default class gearBum extends Component {

  renderScene(route, navigator) {
    if(route.name == 'Home') {
      return <Home navigator={navigator} {...route.passProps}  />
    }
    if(route.name == 'Activity') {
      return <Activity navigator={navigator} {...route.passProps}  />
    }
    if(route.name == 'Post') {
      return <Post navigator={navigator} {...route.passProps}  />
    }
  }

  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ name: 'Home' }}
        renderScene={ this.renderScene }
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.HorizontalSwipeJump} />
    )
  }
}


AppRegistry.registerComponent('gearBum', () => gearBum);
