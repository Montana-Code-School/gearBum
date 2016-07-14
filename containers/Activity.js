import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';

class Activity extends Component {

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
      <View style={ styles.mainActivity }>
        <TouchableHighlight onPress={ () => this.props.navigator.pop() }>
          <Text>
            Home
          </Text>
        </TouchableHighlight>
        <View style={ styles.picMenu }>
          <Image 
            style={styles.pic}
            source={require('../img/sports.png')}
          />  
          <Image 
            style={styles.pic}
            source={require('../img/ski-lift.png')}
          />  

          <Image 
            style={styles.pic}
            source={require('../img/night-camping.png')}
          />  
          <Image 
            style={styles.pic}
            source={require('../img/boat.png')}
          />  
        </View>
          <Text>
            Activity
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainActivity: {
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  picMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pic: {
    width: 125,
    resizeMode: 'contain',
    margin: 10,
  },
  
});
module.exports = Activity