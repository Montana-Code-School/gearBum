import React, { Component } from 'react';
import ReactNative from 'react-native';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  AlertIOS,
  findNodeHandle,
  Image,
} from 'react-native';
import formStyles from '../CSS/FormStyle';
import homeStyles from '../CSS/HomeStyle';
import {serverUrl} from '../constants/serverConstants';


class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      username: this.props.username,
      bio: this.props.bio,
      picture: '',
    };
  }

  updateUser(){
    var self = this
    fetch(serverUrl +'/api/v1/updateUser/' + this.props.email, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email : self.state.email,
        username: self.state.username,
        bio: self.state.bio,
      })
    }).then(function(response) {
      return response.json()
    }).then(() => this.props.toggleDisplay()
    ).catch(function(ex) {
      console.log("Profile Not Updated")
      console.log('parsing failed', ex)
    })
  }

  inputFocused (refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[refName]),
        110,
        true
      );
    }, 50);
  }

  render() {
    return (
      <ScrollView ref='scrollView'>
        <View style={ formStyles.toggleContainer }>
          <TextInput
            ref='email'
            style={ formStyles.inputBar }
            onFocus={() => this.inputFocused('email')}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          <TextInput
            ref='username'
            placeholder='Username'
            style={ formStyles.inputBar }
            onFocus={() => this.inputFocused('username')}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
          />
          <TextInput
            ref='bio'
            placeholder="Bio"
            multiline = {true}
            style={ formStyles.inputArea }
            onFocus={() => this.inputFocused('bio')}
            onChangeText={(bio) => this.setState({bio})}
            value={this.state.bio}
          />
        </View>
        <TouchableHighlight onPress={ () => this.updateUser()} style={ formStyles.loginBtn }>
            <Text style={ homeStyles.textWhite }>
              Update Profile
            </Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}
module.exports = ProfileForm