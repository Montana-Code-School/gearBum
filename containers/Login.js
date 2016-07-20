import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  AlertIOS
} from 'react-native';
import loginPostStyles from '../CSS/LoginPostStyle'
import homeStyles from '../CSS/HomeStyle';

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
            <Text>Email</Text>
            <TextInput
              style={ loginPostStyles.inputBar }
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
            <Text>Password</Text>
            <TextInput
              style={ loginPostStyles.inputBar }
              secureTextEntry={true}
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
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
            <TextInput
              placeholder=" RETYPE PASSWORD"
              secureTextEntry={true}
              style={ loginPostStyles.inputBar }
              onChangeText={(verifyPwd) => this.setState({verifyPwd})}
              value={this.state.verifyPwd}
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
  }r

  login(){
    var self = this
    if (!this.validateEmail(this.state.email)) {
      AlertIOS.alert("Please enter a valid email address.")
    } else {
      fetch('http://localhost:3000/api/v1/login/', {
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
      }).then(() => this._navigate('Home')
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
      fetch('http://localhost:3000/api/v1/signup/', {
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
            <Text style={homeStyles.welcome}>
              Welcome to Gear Bum!
            </Text>
          </View>
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
