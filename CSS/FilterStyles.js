import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions
 } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
const red = '#bc2025'
const window = Dimensions.get('window');

function vw(percentageWidth) {
  return Dimensions.get('window').width * (percentageWidth / 100);
}
function vh(percentageHeight) {
  return Dimensions.get('window').height * (percentageHeight / 100);
}
const filterStyles = StyleSheet.create({
  mainFilter: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  picMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pic: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 20,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 5,
    padding: 50,
  },
  picBtn: {
    margin:20,
    height:110
  },
})

module.exports = filterStyles

