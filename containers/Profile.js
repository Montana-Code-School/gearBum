import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput
} from 'react-native';
import profileStyles from '../CSS/ProfileStyle';
import Menu from '../components/SideMenu';
const SideMenu = require('react-native-side-menu');

class ProfileContent extends Component {
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
      <View style={ profileStyles.profileContainer }>
        <Text>
          Provider Home Page
        </Text>
        <View style={ profileStyles.picBorder }>
          <Image
            style={ profileStyles.pic }
            source={require('../img/images.png')}/>
        </View>
         <TouchableOpacity onPress={ () => this._navigate('Post') }>
          <Text>
            Add Post
          </Text>
        </TouchableOpacity>
         <TouchableOpacity onPress={ () => !this.props.isOpen}>
          <Text>
            Menu
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// class ProfilePage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isOpen: false,
//     };
//   }

//   render() {
//     return (
//       <SideMenu menu={Menu}>
//         <ProfileContent isOpen={this.props.isOpen} />
//       </SideMenu>
//     )
//   }

// }
module.exports = ProfileContent