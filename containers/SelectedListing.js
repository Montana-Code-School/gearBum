import React, { Component } from 'react';
import {
  Dimensions,
  MapView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import selectedListingStyles from '../CSS/SelectedListingStyles';
import homeStyles from '../CSS/HomeStyle';
import Menu from '../components/SideMenu';
import Button from '../components/Button';
const SideMenu = require('react-native-side-menu');
import {serverUrl} from '../constants/serverConstants';
const window = Dimensions.get('window');


class SelectedListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEquip: {},
      displayPhoto: [],
      displayLat: 0,
      displayLong: 0
    };
  }

  _navigate(name, providerid, display) {
    this.props.navigator.push({
      name: name,
      passProps: {
        name: name,
        providerid: providerid, 
        display: display
      }
    })
  }

  getUserName(){
    console.log('get username', this.state.selectedEquip.usersid)
    fetch(serverUrl + "/api/v1/getUsers/" + this.state.selectedEquip.usersid, {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
      console.log("FETCH ON PROFILE BY ID", responseData)
      this.setState({username: responseData[0].username})
    }).catch(err => console.log(err))
  }

  componentWillMount(){
    var self = this
    if(this.props.equipid){ 
      fetch(serverUrl+"/api/v1/equip/detail/" + this.props.equipid, {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
          self.setState({selectedEquip: responseData[0]})
          var thumbNail = self.state.selectedEquip.photos.split(' ')
          self.setState({displayPhoto: this.state.displayPhoto.concat(thumbNail)})
          var lat = Number(this.state.selectedEquip.latitude)
          var long = Number(this.state.selectedEquip.longitude)
          self.setState({displayLat: lat})
          self.setState({displayLong: long})
        }).then(() => this.getUserName())
        .catch(err => console.log(err))
    }
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
  toProfilePage(){
    this._navigate('ProfilePage', this.state.selectedEquip.usersid, true)
  }

 render() {
  const menu = <Menu navigator={this.props.navigator}  setUsersid={this.props.setUsersid}/>
	return (
    <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
  	  <View style={ selectedListingStyles.mainSelectedListing }>
        <View style={ homeStyles.headerContainer }>
          <Text style={ homeStyles.headerText }>
            GEARBUM
          </Text>
        </View>
        <ParallaxScrollView
          style={selectedListingStyles.imgContainer}
          renderBackground={() => <Image source={{uri: this.state.displayPhoto[0]}} style={ selectedListingStyles.img }/>}
          renderForeground={() => 
            <View style={ selectedListingStyles.imgTextContainer }>
              <Text style={ selectedListingStyles.imgText }>{this.state.selectedEquip.price}</Text>
            </View>
          }
          parallaxHeaderHeight={ 250 }>
          <View style={ selectedListingStyles.listingContainer }>
            <Text style={ selectedListingStyles.equipTitle }>
              {this.state.selectedEquip.title}
            </Text>
            <View style={ homeStyles.hr }/>
            <View style={ selectedListingStyles.userInfoContainer}>
              <View>
                <Text style={ selectedListingStyles.userInfoText }>{this.state.selectedEquip.category} </Text>
                <TouchableOpacity 
                  onPress={() => this.toProfilePage()}
                >
                  <Text style={ selectedListingStyles.userInfoText }>
                    {this.state.username}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={ selectedListingStyles.userImgContainer }>
                <Image
                  style={ selectedListingStyles.userImg }
                  source={{uri: 'http://lorempixel.com/output/people-q-c-640-480-9.jpg'}}/>
              </View>
            </View>
            <View style={ homeStyles.hr }/>
            <Text style={ selectedListingStyles.equipText }>
              {this.state.selectedEquip.description}
            </Text>
            <MapView
              style={ homeStyles.map }
              region={{latitude: this.state.displayLat, longitude: this.state.displayLong, latitudeDelta: 0.025, longitudeDelta: 0.025}}
              annotations={[{latitude: this.state.displayLat, longitude: this.state.displayLong}]}/>
          </View>
        </ParallaxScrollView>
  	  </View>
      <Button
       style={ homeStyles.menuIconContainer} 
       onPress={() => this.toggle()}>
        <Image
         style={ homeStyles.imgMenuIcon}
         source={require('../img/whiteGear.png')} />
      </Button>
    </SideMenu>
	)
 }


}
module.exports = SelectedListing