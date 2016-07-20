import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  AlertIOS
} from 'react-native';
import activityStyles from '../CSS/ActivityStyle';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: ''
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
  _onPressButtonGet(category){
    var self = this
    fetch("http://localhost:3000/api/v1/equip/" + category , {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
        self.setState({results: responseData})
      })
  }
  display(){
    if (this.state.results === ''){
      return (
        <View style={ activityStyles.picMenu }>
          <TouchableHighlight style={ activityStyles.picBtn } onPress={() => this._onPressButtonGet('bike')}>
            <Image 
              style={ activityStyles.pic }
              source={require('../img/sports.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight style={ activityStyles.picBtn } onPress={() => this._onPressButtonGet('snow')}>  
            <Image 
              style={ activityStyles.pic }
              source={require('../img/ski-lift.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight style={ activityStyles.picBtn } onPress={() => this._onPressButtonGet('camp')}>    
            <Image 
              style={ activityStyles.pic }
              source={require('../img/night-camping.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight style={ activityStyles.picBtn } onPress={() => this._onPressButtonGet('boat')}>
            <Image 
              style={ activityStyles.pic }
              source={require('../img/boat.png')}
            />
          </TouchableHighlight>   
        </View>
      )
    } else {
      return (
        <View>
          <Text>
            {this.state.results.map(function(values){
              return (
                <Text key={values.equipid}>
                    {values.category}
                    {'\n'}
                    {values.price}
                    {'\n'}
                    {values.description}
                    {'\n'}
                    {values.location}
                    {'\n'}
                    {'\n'}
                </Text>
              )
            })}
          </Text>
        </View>
    )}
  }

  render() {
    return (
      <View style={ activityStyles.mainActivity }>
        <TouchableHighlight onPress={ () => this.props.navigator.pop() }>
          <Text>
            Home
          </Text>
        </TouchableHighlight>
        {this.display()}
          <Text>
            Activity
          </Text>
      </View>
    );
  }
}

module.exports = Activity