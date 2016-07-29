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
const findGearStyles = StyleSheet.create({
  mainFindGear: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  resultsScrollView: {
  	width: window.width,
  	backgroundColor: '#f6f6f6',
  	padding: 10,
  },
  resultsContainer: {
  	alignItems: 'center',
  	height: vh(85),
  },
  resultsItemsContainer: {
  	flexDirection: 'row',
  	flexWrap: 'wrap',
  	justifyContent: 'space-around',
  },
  resultsTouch: {
  	width: 160,
    height: 160,
  }, 
  resultsImg: {
  	resizeMode: 'cover',
    width: 160,
    height: 160,
  },
  resultsText: {
  	paddingTop: 3,
  	textAlign: 'center',
  	width: 160,
  	height: 20,
  	marginTop: 140,
  	color: 'white',
  	fontWeight: 'bold',
  	fontSize: 10,
  	backgroundColor: 'rgba(0,0,0,.3)',
  },
  optionsContainer: {
  	flex: 1,
  	flexDirection: 'row',
  },
  optionsBtn: {
  	backgroundColor: red,
  	width: vw(50),
  	height: vh(7),
  	alignItems: 'center',
  	justifyContent: 'center',
  	position: 'absolute',
  	bottom: 0,
  	left: 0,
  },
  optionsBtnLeft: {
  	borderColor: 'white',
  	borderRightWidth: 1,
  	backgroundColor: red,
  	width: vw(50),
  	height: vh(7),
  	alignItems: 'center',
  	justifyContent: 'center',
  	position: 'absolute',
  	right:0,
  	bottom: 0,
  },
  optionsBtnText: {
  	color: 'white',
  	fontWeight: 'bold',
  	fontSize: 11,
  },
})

  module.exports = findGearStyles