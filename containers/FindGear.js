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

  render() {
    return (
      <View style={ findGearStyles.mainFindGear }>
        <Text style={ findGearStyles.header }>
          Find Gear
        </Text>
        <View style={ findGearStyles.resultsContainer }>
          <ScrollView style={ findGearStyles.resultsScrollView }>
              {this.state.results.map((equipment)=>{
                return (
                  <TouchableOpacity onPress={()=>this._navigate('SelectedListing')}>
                    <View style={ findGearStyles.resultsItems }>
                      <Image 
                        style={ findGearStyles.resultsImg }
                        source={require('../img/sweetbike.jpeg')}/>
                      <Text key={equipment.equipid}>
                        {equipment.category}
                        {'\n'}
                        {equipment.price}
                        {'\n'}
                        {equipment.location}
                        {'\n'}
                        {'\n'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
          </ScrollView>  
        </View>
        <View style={ findGearStyles.optionsContainer }>
          <TouchableOpacity 
            style={ findGearStyles.optionsBtn }
            onPress={() => this._navigate('Filter')}>
            <Text style={ homeStyles.textWhite }>
              Filter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={ findGearStyles.optionsBtn }
            onPress={() => this._navigate('Post')}>
            <Text style={ homeStyles.textWhite }>
              Rent Your Gear
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

module.exports = FindGear