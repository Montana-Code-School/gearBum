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
const imageUploadStyles = EStyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    width: 350,
    height: 300,
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
  },
  addImageContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    width: 350,
    height: 200,
    borderColor: 'black',
    borderWidth: 1,
    padding: 0,
  },
  firstImageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  addImageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
    marginBottom: 10,
  },
});

module.exports = imageUploadStyles