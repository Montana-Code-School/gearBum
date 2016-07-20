import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  TextInput
} from 'react-native';
import profileStyles from '../CSS/ProfileStyle';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={ profileStyles.profileContainer }>
        <Text>
          Provider Home Page
        </Text>
        <View style={ profileStyles.picBorder }>
          <Image
            style={ profileStyles.pic }
            source={require('../img/images.png')}/>
        </View>
         <TouchableHighlight onPress={ () => {
          this.props.navigator.popToTop('Home')
        }}>
          <Text>
            Home
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = ProfilePage