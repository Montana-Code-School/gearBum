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
    console.log('passing this equipid', equipid)
    console.log('passing name', name) 

    this.props.navigator.push({
      name: name,
      passProps: {
        name: name,
        equipid
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
    console.log('equip id',equipid)
    this._navigate('SelectedListing', equipid)
  }

  render(){
    return (
      <View style={ findGearStyles.resultsContainer }>
        <ScrollView style={ findGearStyles.resultsScrollView }>
          <View style={ findGearStyles.resultsItemsContainer }>  
            {this.state.results.map((equipment)=>{
              return (
                <TouchableOpacity
                  style={ findGearStyles.resultsTouch } 
                  onPress={()=> this.toSelectedListing(equipment.equipid)}
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
    )
  }
} 

module.exports = FindAllGear