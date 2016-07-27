import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import selectedListingStyles from '../CSS/SelectedListingStyles';

class SelectedListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
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

 render() {
	return (
	  <View style={ selectedListingStyles.mainSelectedListing }>
	    <Text style={ selectedListingStyles.header }>
	      Bike, Missoula
	    </Text>
	  </View>
	)
 }


}
module.exports = SelectedListing