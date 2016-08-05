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
// import AccountSettings from './containers/AccountSettings';
import Post from './containers/Post';
import Login from './containers/Login';
import ProfilePage from './containers/Profile';
import SearchGear from './containers/SearchGear';
import SelectedListing from './containers/SelectedListing';
import SideMenu from './components/SideMenu';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class GearBum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersid: ''
    };
  }

  setEmail(usersid){
    this.setState({usersid: usersid})
  }

  getEmail(){
    return this.state.usersid
  }

  renderScene(route, navigator) {
    const passProps  = route.passProps || {}
    passProps.usersid = this.getEmail()
    passProps.setEmail = this.setEmail
    if(route.name == 'Post') {
      return <Post navigator={navigator}  {...passProps}  />
    }
    if(route.name == 'Login') {
      return <Login navigator={navigator} {...passProps} />
    }
    if(route.name == 'ProfilePage') {
      return <ProfilePage navigator={navigator}  {...passProps} />
    }
    if(route.name == 'SearchGear') {
      return <SearchGear navigator={navigator}  {...passProps} />
    }
    if(route.name == 'SelectedListing') {
      return <SelectedListing navigator={navigator}  {...passProps}/>
    }
    if(route.name == 'SideMenu') {
      return <SideMenu navigator={navigator} {...passProps}/>
    }
    // if(route.name == 'AccountSettings') {
    //   return <AccountSettings navigator={navigator} {...passProps}/>
    // }
  }



  render() {
    EStyleSheet.build();
    global.___DEV___ = false
    const sceneConfig = {
      ...Navigator.SceneConfigs.HorizontalSwipeJump,
      gestures: {}
    }
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ name: 'Login' }}
        renderScene={ this.renderScene }
        setEmail={this.setEmail.bind(this)}
        getEmail={this.getEmail.bind(this)}
        configureScene={() => sceneConfig } />
    )
  }
}


AppRegistry.registerComponent('gearBum', () => GearBum);
