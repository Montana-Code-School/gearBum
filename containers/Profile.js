import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  TextInput
} from 'react-native';
import findGearStyles from '../CSS/FindGearStyles';
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
      usersid: '',
      toggleDisplay: true,
      gear: []
    };
  }

  _navigate(name, equipid) {
    this.props.navigator.push({
      name: name,
      passProps: {
        name: name,
        equipid,
      }
    })
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

  componentWillMount(){
    console.log("ID", this.props.usersid)
    const id = !this.props.providerid ? this.props.usersid : this.props.providerid
    fetch(serverUrl + "/api/v1/getUsers/" + id, {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
      console.log("FETCH ON PROFILE BY ID", responseData)
      this.setState({email: responseData[0].email, username: responseData[0].username, bio: responseData[0].bio, picture: responseData[0].picture, usersid: this.props.usersid })
    }).then(()=> this.fetchGear()
    ).catch(err => console.log(err))
  }

  fetchGear(){
    const id = !this.props.providerid ? this.props.usersid : this.props.providerid
    fetch(serverUrl + "/api/v1/equip/userGear/" + id, {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({gear: responseData})
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
        <ProfileForm email={this.state.email} />
      )
    }
  }

  toSelectedListing(equipid) {
    console.log('providerid', this.props.providerid, 'usersid', this.state.usersid)
    if (parseInt(this.props.providerid) === parseInt(this.state.usersid)) {
      this._navigate('UpdateEquip', equipid)
    } else if(!this.props.providerid){
      this._navigate('UpdateEquip', equipid)
    } else {
      this._navigate('SelectedListing', equipid)
    }
  }

  render() {
    const menu = <Menu navigator={this.props.navigator} setUsersid={this.props.setUsersid}/>
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={ profileStyles.profileContainer }>
          <Gravatar emailAddress={this.state.email}  size={140} mask='circle' />
        <Text style={ profileStyles.userName }>
           {this.state.username ? this.state.username : 'GEARBUM User'}
        </Text>
        <View style={ profileStyles.descriptionHeaderContainer}>
          <Text style={ homeStyles.textWhite}>
             About {this.state.username ? this.state.username : 'GEARBUM User'}
          </Text>
        </View>
        <ScrollView style={ profileStyles.scrollView}>
        {this.display()}
        <View style={ profileStyles.descriptionHeaderContainer}>
          <Text style={ homeStyles.textWhite}>
            {this.state.username ? this.state.username : 'GEARBUM User'}'s Gear
          </Text>
        </View>
          {this.state.gear.length !== 0 ?
            <View style={ profileStyles.userGearContainer }> 
              {this.state.gear.map((gear) => {
                var thumbNail = gear.photos.split(' ')
                return (
                  <TouchableOpacity
                    style={ profileStyles.userGearTouch }
                    key={gear.equipid}
                    onPress={() => this.toSelectedListing(gear.equipid)}
                  >
                    <Image
                      key={`image-${gear.equipid}`}
                      style={ profileStyles.userGearImg }
                      source={{uri: thumbNail[0]}}>
                      <Text 
                        style={ profileStyles.userGearText }
                        key={gear.equipid}>
                        {gear.location} {gear.price}
                      </Text>
                    </Image>
                  </TouchableOpacity> 
                )
              })}
            </View> :
            <Text style={ profileStyles.noGearText }>You have no gear listed</Text>
          }       
          {!this.props.providerid ? 
            <TouchableOpacity
            style={ profileStyles.loginBtn } 
            onPress={() => this.setState({toggleDisplay: !this.state.toggleDisplay})}>
              <Text style={ homeStyles.textWhite }>
                {this.state.toggleDisplay ? 'Edit Profile' : 'View Profile'}
              </Text>
            </TouchableOpacity> : 
            <Text />
          }
        </ScrollView>
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