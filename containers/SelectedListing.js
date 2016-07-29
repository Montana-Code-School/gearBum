import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import selectedListingStyles from '../CSS/SelectedListingStyles';
import homeStyles from '../CSS/HomeStyle';
import Menu from '../components/SideMenu';
import Button from '../components/Button';
const SideMenu = require('react-native-side-menu');
import {serverUrl} from '../constants/serverConstants';


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
    if(this.props.equipid){
      fetch(serverUrl+"/api/v1/equip/detail/" + this.props.equipid, {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
          self.setState({selectedEquip: responseData[0]})
          console.log('responseData', responseData)
        })
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
         <View style={ selectedListingStyles.listingContainer }>
         <View style={ selectedListingStyles.imgContainer }>
         <Image
            style={ selectedListingStyles.img }
            source={{uri: 'http://lorempixel.com/output/people-q-c-640-480-9.jpg'}}/>
         </View>
    	    <Text style={ selectedListingStyles.equipText }>
            Equipment Details:
            {'\n'}
    	      {this.state.selectedEquip.location} {'\n'}
            {this.state.selectedEquip.price} {'\n'}
            {this.state.selectedEquip.description} {'\n'}
    	    </Text>
         </View>
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