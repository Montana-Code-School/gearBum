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
      selectedEquip: {}
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

  componentWillMount(){
    var self = this
    console.log('receiving props', this.props)
    // if(this.props.equipid){
      fetch(serverUrl+"/api/v1/equip/detail/1", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
          self.setState({selectedEquip: responseData[0]})
          console.log('responseData', responseData)
        })
        .catch(err => console.log(err))
    //}
  }

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
  const menu = <Menu navigator={this.props.navigator} />
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
          renderBackground={() => <Image source={{ uri: `https://placekitten.com/414/350` }} style={ selectedListingStyles.img }/>}
          renderForeground={() => 
            <View style={ selectedListingStyles.imgTextContainer }>
              <Text style={ selectedListingStyles.imgText }>{this.state.selectedEquip.price}</Text>
            </View>
          }
          parallaxHeaderHeight={ 250 }>
          <View style={ selectedListingStyles.listingContainer }>
            <Text style={ selectedListingStyles.equipTitle }>
              {this.state.selectedEquip.description}
            </Text>
            <View style={ homeStyles.hr }/>
            <View style={ selectedListingStyles.userInfoContainer}>
              <View>
                <Text style={ selectedListingStyles.userInfoText }>{this.state.selectedEquip.category} </Text>
                <Text style={ selectedListingStyles.userInfoText }>Rented by Luke W. </Text>
              </View>
              <View style={ selectedListingStyles.userImgContainer }>
                <Image
                  style={ selectedListingStyles.userImg }
                  source={{uri: 'http://lorempixel.com/output/people-q-c-640-480-9.jpg'}}/>
              </View>
            </View>
            <View style={ homeStyles.hr }/>
            <Text style={ selectedListingStyles.equipText }>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
            <MapView
              style={ homeStyles.map }
              region={{latitude: 51.5, longitude: -0.127, latitudeDelta: 0.025, longitudeDelta: 0.025}}
              annotations={[{latitude: 51.5, longitude: -0.127}]}/>
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