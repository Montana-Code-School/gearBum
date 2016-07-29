import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
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
const selectedListingStyles = EStyleSheet.create({
  mainSelectedListing: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backBtnContainer: {

  },
  backBtn: {
    paddingTop: 30,
  },
  backBtnText: {

  },
  equipContainer: {
  	height: vh(91),
    width: vw(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  equipText: {
    
  },
})

  module.exports = selectedListingStyles