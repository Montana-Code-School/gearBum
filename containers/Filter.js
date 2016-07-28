import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  AlertIOS
} from 'react-native';
import filterStyles from '../CSS/FilterStyles';
import homeStyles from '../CSS/HomeStyle';
import Menu from '../components/SideMenu';
import Button from '../components/Button';
const SideMenu = require('react-native-side-menu');

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: ''
    };
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
  _navigate(name) {
    this.props.navigator.push({
      name: name,
      passProps: {
        name: name
      }
    })
  }
  _onPressButtonGet(category){
    var self = this
    fetch("https://gearbum.herokuapp.com/api/v1/equip/" + category , {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
        self.setState({results: responseData})
      })
  }
  display(){
    if (this.state.results === ''){
      return (
        <View style={ filterStyles.picMenu }>
          <TouchableHighlight style={ filterStyles.picBtn } onPress={() => this._onPressButtonGet('bike')}>
            <Image 
              style={ filterStyles.pic }
              source={require('../img/sports.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight style={ filterStyles.picBtn } onPress={() => this._onPressButtonGet('snow')}>  
            <Image 
              style={ filterStyles.pic }
              source={require('../img/ski-lift.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight style={ filterStyles.picBtn } onPress={() => this._onPressButtonGet('camp')}>    
            <Image 
              style={ filterStyles.pic }
              source={require('../img/night-camping.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight style={ filterStyles.picBtn } onPress={() => this._onPressButtonGet('boat')}>
            <Image 
              style={ filterStyles.pic }
              source={require('../img/boat.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight style={ filterStyles.picBtn } onPress={() => this._onPressButtonGet('golf')}>
            <Image 
              style={ filterStyles.pic }
              source={require('../img/golf.png')}
            />
          </TouchableHighlight>
        </View>
      )
    } else {
      return (
        <View>
          <Text>
            {this.state.results.map(function(values){
              return (
                <Text key={values.equipid}>
                    {values.category}
                    {'\n'}
                    {values.price}
                    {'\n'}
                    {values.description}
                    {'\n'}
                    {values.location}
                    {'\n'}
                    {'\n'}
                </Text>
              )
            })}
          </Text>
        </View>
    )}
  }

  render() {
    const menu = <Menu />
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={ homeStyles.headerContainer }>
          <Text style={ homeStyles.headerText }>
            GEARBUM
          </Text>
        </View>
        <View style={ filterStyles.mainFilter }>
          {this.display()}
            <Text>
              Filter Gear Listings
            </Text>
        </View>
        <Button
           style={ homeStyles.menuIconContainer} 
           onPress={() => this.toggle()}>
            <Image
              style={ homeStyles.imgMenuIcon}
              source={require('../img/whiteGear.png')} 
            />
          </Button>
      </SideMenu>
    );
  }
}

module.exports = Filter