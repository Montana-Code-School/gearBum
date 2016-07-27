import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
 } from 'react-native';


const window = Dimensions.get('window');
const findGearStyles = StyleSheet.create({
  mainFindGear: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
  	marginTop: 50,
  	marginBottom: 20,
  },
  resultsScrollView: {
  	width: window.width,
  	backgroundColor: '#f6f6f6',
  	padding: 10,
  },
  resultsContainer: {
  	alignItems: 'center',
  	margin: 10,
  	height: 500,
  },
  resultsItems: {
  	flex: 1,
  	flexDirection: 'row',
  	margin: 15,
  },
  resultsImg: {
  	resizeMode: 'cover',
    width: 140,
    height: 140,
    marginRight: 15,
  },
  optionsContainer: {
  	flex: 1,
  	flexDirection: 'row',
  },
  optionsBtn: {
  	backgroundColor: '#bc2025',
  	width: 150,
  	height: 50,
  	margin: 15,
  	alignItems: 'center',
  	justifyContent: 'center',
  },
})

  module.exports = findGearStyles