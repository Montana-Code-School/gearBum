import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  AlertIOS
} from 'react-native';
import filterStyles from '../CSS/FilterStyles';

class Filter extends Component {
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
    fetch("https://gearbum.herokuapp.com/api/v1/equip/" + category , {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
        self.setState({results: responseData})
      })
  }
  display(){
    if (this.state.results === ''){
      return (
        <View style={ filterStyles.picMenu }>
          <TouchableHighlight style={ filterStyles.picBtn } onPress={() => this._onPressButtonGet('bike')}>
            <Image 
              style={ filterStyles.pic }
              source={require('../img/sports.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight style={ filterStyles.picBtn } onPress={() => this._onPressButtonGet('snow')}>  
            <Image 
              style={ filterStyles.pic }
              source={require('../img/ski-lift.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight style={ filterStyles.picBtn } onPress={() => this._onPressButtonGet('camp')}>    
            <Image 
              style={ filterStyles.pic }
              source={require('../img/night-camping.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight style={ filterStyles.picBtn } onPress={() => this._onPressButtonGet('boat')}>
            <Image 
              style={ filterStyles.pic }
              source={require('../img/boat.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight style={ filterStyles.picBtn } onPress={() => this._onPressButtonGet('golf')}>
            <Image 
              style={ filterStyles.pic }
              source={require('../img/golf.png')}
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
      <View style={ filterStyles.mainFilter }>
        <TouchableHighlight onPress={ () => this.props.navigator.pop() }>
          <Text>
            Home
          </Text>
        </TouchableHighlight>
        {this.display()}
          <Text>
            Filter Gear Listings
          </Text>
      </View>
    );
  }
}

module.exports = Filter