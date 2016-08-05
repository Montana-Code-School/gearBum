import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  AlertIOS,
  ScrollView,
} from 'react-native';
import FindAllGear from './FindAllGear';
import FilterGear from './FilterGear';
import findGearStyles from '../CSS/FindGearStyles';
import homeStyles from '../CSS/HomeStyle';
import Menu from '../components/SideMenu';
import Button from '../components/Button';
import SelectedListing from './SelectedListing';
const SideMenu = require('react-native-side-menu');

class SearchGear extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toggleDisplay: true,
      email: ''
    };
  }
  
  _navigate(name, equipid) {
    this.props.navigator.push({
      name: name,
      passProps: {
        name: name,
        equipid
      }
    })
  }
  
  state = {
    isOpen: false,
  }

  toggleMenu(){
    this.setState({
      isOpen: !this.state.isOpen
    })
    console.log(this.state.isOpen)
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  toggle(){
    this.setState({toggleDisplay: !this.state.toggleDisplay})
  }

  display(){
    if(this.state.toggleDisplay){
      return (
        <FindAllGear 
          navigator={this.props.navigator}
        />
      )
    } else {
      return (
        <FilterGear
          navigator={this.props.navigator}
          toggleFxn={this.toggle.bind(this)}
        />)
    }
  }

  render() {
    const menu = <Menu navigator={this.props.navigator} setEmail={this.props.setEmail}/>
    return (
      <SideMenu
        email={this.state.email}
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
      <View style={ findGearStyles.mainFindGear }>
        <View style={ homeStyles.headerContainer }>
          <Text style={ homeStyles.headerText }>
            GEARBUM
          </Text>
        </View>
        {this.display()}
        <View style={ findGearStyles.optionsContainer }>
          <TouchableOpacity 
            style={ findGearStyles.optionsBtnLeft }
            onPress={() => this.toggle()}>
            <Text style={ findGearStyles.optionsBtnText }>
              Filter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={ findGearStyles.optionsBtn }
            onPress={() => this._navigate('Post')}>
            <Text style={ findGearStyles.optionsBtnText }>
              Rent Your Gear
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button
       style={ homeStyles.menuIconContainer} 
       onPress={() => this.toggleMenu()}>
        <Image
          style={ homeStyles.imgMenuIcon}
          source={require('../img/whiteGear.png')} 
        />
      </Button>
      </SideMenu>
    );
  }
}

module.exports = SearchGear