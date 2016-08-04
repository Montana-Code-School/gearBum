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
const profileStyles = EStyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 60,
    paddingBottom: 60,
  },
  imgContainer: {
    borderRadius: 140,
    width: 140,
    height: 140,
    overflow: 'hidden',
  },
  img: {
    resizeMode: 'cover',
    width: 140,
    height: 140,
  },
  userName: {
    alignSelf: 'center',
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

module.exports = profileStyles