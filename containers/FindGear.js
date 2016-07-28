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
import findGearStyles from '../CSS/FindGearStyles';
import homeStyles from '../CSS/HomeStyle';
import Menu from '../components/SideMenu';
import Button from '../components/Button';
const SideMenu = require('react-native-side-menu');

class FindGear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
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
    fetch("https://gearbum.herokuapp.com/api/v1/equip", {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
        self.setState({results: responseData})
      })
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
    const menu = <Menu />
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
      <View style={ findGearStyles.mainFindGear }>
        <View style={ homeStyles.headerContainer }>
          <Text style={ homeStyles.headerText }>
            GEARBUM
          </Text>
        </View>
        <View style={ findGearStyles.resultsContainer }>
          <ScrollView style={ findGearStyles.resultsScrollView }>
            <View style={ findGearStyles.resultsItemsContainer }>  
              {this.state.results.map((equipment)=>{
                return (
                  <TouchableOpacity
                    style={ findGearStyles.resultsTouch } 
                    onPress={()=>this._navigate('SelectedListing')}
                    key={`touch-${equipment.equipid}`}>
                      <Image
                        key={`image-${equipment.equipid}`}
                        style={ findGearStyles.resultsImg }
                        source={{ uri: 'http://www.neatorama.com/wp-content/uploads/2012/04/candy_bike.jpg'}}>
                        <Text 
                          style={ findGearStyles.resultsText }
                          key={equipment.equipid}>
                          {equipment.location} {equipment.price}                        
                          {'\n'}
                        </Text>
                      </Image>
                  </TouchableOpacity>
                )
              })}
            </View>
          </ScrollView>  
        </View>
        <View style={ findGearStyles.optionsContainer }>
          <TouchableOpacity 
            style={ findGearStyles.optionsBtnLeft }
            onPress={() => this._navigate('Filter')}>
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

module.exports = FindGear