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
  equipText: {
    
  },
  listingContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imgContainer: {
    width: vw(100),
    height: 240,
    overflow: 'hidden',
  },
  img: {
    resizeMode: 'cover',
    width: vw(100),
    height: 240,
  },
  userName: {
    color: 'grey',
    margin: 15,
  },
  descriptionHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: window.width,
    backgroundColor: red,
  },
  descriptionContainer: {
    width: window.width,
    backgroundColor: '#f6f6f6',
    padding: 30,
    alignItems: 'center'
  },
})

  module.exports = selectedListingStyles