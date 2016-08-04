import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput
} from 'react-native';
import ProfileForm from '../components/ProfileForm';
import Gravatar from 'react-native-avatar-gravatar';
import profileStyles from '../CSS/ProfileStyle';
import homeStyles from '../CSS/HomeStyle'
import Menu from '../components/SideMenu';
import Button from '../components/Button';
import {serverUrl} from '../constants/serverConstants';
const SideMenu = require('react-native-side-menu');
const uri = 'http://lorempixel.com/output/people-q-c-640-480-9.jpg';

class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      bio: '',
      picture: '',
      toggleDisplay: true
    };
  }

  state = {
    isOpen: false,
  }

  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  componentDidMount(){
    this.setState({toggleDisplay: this.props.display})
    fetch(serverUrl +"/api/v1/getUsers/" + this.props.email, {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({email: this.props.email, username: responseData[0].username, bio: responseData[0].bio, picture: responseData[0].picture})
    }).catch(err => console.log(err))
  }

  display(){
    if(this.state.toggleDisplay){
      return(
          <View style={ profileStyles.descriptionContainer}>
            <Text>
              {this.state.bio ? this.state.bio : 'Tell us about yourself'}
            </Text>
          </View>
      )
    } else {
      return(
        <ProfileForm />
      )
    }
  }

  render() {
    const menu = <Menu navigator={this.props.navigator} />
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={ profileStyles.profileContainer }>
        <Gravatar emailAddress={this.state.email}  size={140} mask='circle' />
        <Text style={ profileStyles.userName }>
           {this.state.username ? this.state.username : 'GearBum User'}
        </Text>
        <View style={ profileStyles.descriptionHeaderContainer}>
          <Text style={ homeStyles.textWhite}>
             About {this.state.username ? this.state.username : 'GearBum User'}
          </Text>
        </View>
        {this.display()}
        <TouchableOpacity onPress={() => this.setState({toggleDisplay: !this.state.toggleDisplay})}>
            <Text>
              {this.state.toggleDisplay ? 'Edit Profile' : 'View Profile'}
            </Text>
          </TouchableOpacity>
        <Button
         style={ homeStyles.menuIconContainer} 
         onPress={() => this.toggle()}>
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