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
import {serverUrl} from '../constants/serverConstants';


class FindAllGear extends Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
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

  componentWillMount(){
    var self = this
    fetch(serverUrl + "/api/v1/equip", {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
        self.setState({results: responseData})
      })
  }

  toSelectedListing(equipid) {
    this._navigate('SelectedListing', equipid)
  }

  render(){
    return (
      <View style={ findGearStyles.resultsContainer }>
        <ScrollView style={ findGearStyles.resultsScrollView }>
          <View style={ findGearStyles.resultsItemsContainer }>  
            {this.state.results.map((equipment)=>{
              var thumbNail = equipment.photos.split(' ')
              return (
                <TouchableOpacity
                  style={ findGearStyles.resultsTouch } 
                  onPress={()=> this.toSelectedListing(equipment.equipid)}
                  key={`touch-${equipment.equipid}`}>
                    <Image
                      key={`image-${equipment.equipid}`}
                      style={ findGearStyles.resultsImg }
                      source={{uri: thumbNail[0]}}>
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
    )
  }
} 

module.exports = FindAllGear