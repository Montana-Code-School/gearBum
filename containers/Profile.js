import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput
} from 'react-native';
import profileStyles from '../CSS/ProfileStyle';
import homeStyles from '../CSS/HomeStyle'
import Menu from '../components/SideMenu';
import Button from '../components/Button';
const SideMenu = require('react-native-side-menu');
const uri = 'http://lorempixel.com/output/people-q-c-640-480-9.jpg';

class ProfilePage extends Component {
  state = {
    isOpen: false,
  }

  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    })
    console.log(this.state.isOpen)
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  render() {
    const menu = <Menu />
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={ profileStyles.profileContainer }>
        <View style={ profileStyles.imgContainer }>
          <Image
            style={ profileStyles.img }
            source={{uri: 'http://lorempixel.com/output/people-q-c-640-480-9.jpg'}}/>
        </View>
        <Text style={ profileStyles.userName }>
          Username
        </Text>
        <View style={ profileStyles.descriptionHeaderContainer}>
          <Text style={ homeStyles.textWhite}>
            About Username
          </Text>
        </View>
        <View style={ profileStyles.descriptionContainer}>
          <Text>
            User Description
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
         <Button
         style={ homeStyles.menuIconContainer} 
         onPress={this.props.toggle}>
          <Image
            style={ homeStyles.imgMenuIcon}
            source={require('../img/gear.png')} 
          />
        </Button>
      </View>
      </SideMenu>
    )
  }

}
module.exports = ProfilePage