import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

class Home extends Component {

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
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to Gear Bum!
          </Text>
        </View>
        <View style={styles.btn}>
            <TouchableHighlight onPress={ () => this._navigate('Activity') }>
              <Text>
                Gear Seeker
              </Text>
            </TouchableHighlight>
        </View>
        <View style={styles.btn}>
            <TouchableHighlight onPress={ () => this._navigate('Post') }>
              <Text>
                Gear Provider
              </Text>
            </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 10,
  },
  btn: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 300,
  }
});

module.exports = Home