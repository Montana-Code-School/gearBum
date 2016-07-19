import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput
} from 'react-native';
import loginPostStyles from '../CSS/LoginPostStyle'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      toggleDisplay: true
    };
  }

  display(){
    if (this.state.toggleDisplay){
      return (
        <View>
          <View style={ loginPostStyles.inputContainer }>
            <Text>Email</Text>
            <TextInput
              style={ loginPostStyles.inputBar }
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
            <Text>Password</Text>
            <TextInput
              style={ loginPostStyles.inputBar }
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
            <TouchableHighlight onPress={ () => this.login()}>
              <Text>
                Login
              </Text>
            </TouchableHighlight>
          </View>
        </View> 
      );
    }
    else {
      return (
        <View>
          <View style={ loginPostStyles.inputContainer }>
            <Text>Email</Text>
            <TextInput
              style={ loginPostStyles.inputBar }
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
            <Text>Password</Text>
            <TextInput
              style={ loginPostStyles.inputBar }
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
            <TouchableHighlight onPress={ () => this.signUp()}>
              <Text>
                Create Account
              </Text>
            </TouchableHighlight>
          </View>
        </View> 
      );
    }  
  }

  render() {
    return (
      <View style={ loginPostStyles.mainPost }>
        <TouchableHighlight onPress={ () => this.props.navigator.pop() }>
          <Text>
            Home
          </Text>
        </TouchableHighlight>
        <View style={ loginPostStyles.bodyContainer }>
          <View style={ loginPostStyles.toggleContainer }>
            <TouchableHighlight 
              onPress={ () => this.setState({toggleDisplay: true})}
              style={ loginPostStyles.toggleBtn }>
              <Text>
                Login
              </Text>
            </TouchableHighlight>
            <TouchableHighlight 
              onPress={ () => this.setState({toggleDisplay: false})}
              style={ loginPostStyles.toggleBtn }>  
              <Text>
                Create Account
              </Text>  
            </TouchableHighlight>
          </View>
          {this.display()}
        </View>
      </View>
    );
  }
}

module.exports = Login
