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
    justifyContent: 'center',
    backgroundColor: 'white',
    height: vh(76),
  },
  picMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',    
    justifyContent: 'space-around',
  },
  pic: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 5,
  },
  picBtn: {
    margin:20,
    height:100
  },
  backBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    width: vw(50),
    height: vh(7),
  },
  backBtn: {
    backgroundColor: red,
    width: vw(50),
    height: vh(7),
    alignItems: 'center',    
    justifyContent: 'center',

  },
})

module.exports = filterStyles

