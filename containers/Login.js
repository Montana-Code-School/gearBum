import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  TextInput,
  AlertIOS,
  Image,
} from 'react-native';
import loginPostStyles from '../CSS/LoginPostStyle';
import homeStyles from '../CSS/HomeStyle';
import {serverUrl} from '../constants/serverConstants';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'Pete@gmail.com',
      password: 'test',
      verifyPwd: '',
      toggleDisplay: true
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

  display(){
    if (this.state.toggleDisplay){
      return (
        <View>
          <View style={ loginPostStyles.inputContainer }>
            <TextInput
              placeholder='Email'
              style={ loginPostStyles.inputBar }
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
            <TextInput
              placeholder='Password'
              style={ loginPostStyles.inputBar }
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
            <TouchableHighlight onPress={ () => this.login()} style={ loginPostStyles.loginBtn }>
              <Text style={ homeStyles.textWhite }>
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
            <TextInput
              placeholder='Email'
              style={ loginPostStyles.inputBar }
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
            <TextInput
              placeholder='Password'
              style={ loginPostStyles.inputBar }
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
            <TextInput
              placeholder="Re-Type Password"
              secureTextEntry={true}
              style={ loginPostStyles.inputBar }
              onChangeText={(verifyPwd) => this.setState({verifyPwd})}
              value={this.state.verifyPwd}
            />
            <TouchableHighlight onPress={ () => this.signUp()} style={ loginPostStyles.loginBtn }>
              <Text style={ homeStyles.textWhite }>
                Create Account
              </Text>
            </TouchableHighlight>
          </View>
        </View> 
      );
    }  
  }r

  login(){
    var self = this
    if (!this.validateEmail(this.state.email)) {
      AlertIOS.alert("Please enter a valid email address.")
    } else {
      fetch(serverUrl +'/api/v1/login/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        email : self.state.email,
        password : self.state.password
        })
      }).then(function(response) {
        return response.json()
      }).then(() => this._navigate('SearchGear')
      ).catch(function(ex) {
        AlertIOS.alert("Login Failed")
        console.log('parsing failed', ex)
      })
    }
  }

  signUp(){
    if (this.state.password !== this.state.verifyPwd) {
      AlertIOS.alert("Passwords do not match.")
    }
    else if (!this.validateEmail(this.state.email)) {
      AlertIOS.alert("Please enter a valid email address.")
    } else {
      var self = this
      fetch(serverUrl+ '/api/v1/signup/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
      .then(function(response) {
        return response.json()
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      }).then(() => this.setState({toggleDisplay: true, password: ''}))  
    }
  }

  validateEmail(email){
    var filt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return filt.test(email) 
  }

  render() {
    return (
      <View style={ loginPostStyles.mainPost }>
        <View style={homeStyles.container}>
            <Image
             resizeMode="stretch"
             source={require('../img/gearBumlogo1.png')} 
             />
            <Text style={homeStyles.welcome}>
              Welcome to Gear Bum!
            </Text>
          </View>
        <View style={ loginPostStyles.bodyContainer }>
          <View style={ loginPostStyles.toggleContainer }>
            <TouchableOpacity 
              onPress={ () => this.setState({toggleDisplay: true})}
              style={ loginPostStyles.toggleBtn }>
              <Text style={ homeStyles.textWhite }>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={ () => this.setState({toggleDisplay: false})}
              style={ loginPostStyles.toggleBtn }>  
              <Text style={ homeStyles.textWhite }>
                Create Account
              </Text>  
            </TouchableOpacity>
          </View>
          {this.display()}
        </View>
      </View>
    );
  }
}

module.exports = Login
