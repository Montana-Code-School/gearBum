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
const homeStyles = EStyleSheet.create({
  mainContainer: {
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    height: vh(9),
    width: vw(100),
    backgroundColor: red,
  },
  headerText: {
    paddingTop: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 10,
  },
  welcome: {
    marginTop: 10,
  },
  btn: {
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    height: 40,
    width: 300,
  },
  textWhite: {
    color: 'white',
  },
  textRed: {
    color: red,
  },
  menuIconContainer: {
    position: 'absolute',
    top: 30,
    left: 30,
    width: 20,
    height: 20,
  },
  imgMenuIcon: {
    resizeMode: 'cover',
    width: 20,
    height: 20,
  },
  sideMenu: {
    backgroundColor: 'rgba(0,0,0,1)',
    flex: 1,
    width: window.width,
    height: window.height,
  },
  sideMenuIconContainer: {
    height: 150,
    width: vw(66),
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideMenuIcon: {
    resizeMode: 'cover',
    width: 60,
    height: 60,
  },
  sideMenuContainer: {
    height: window.height,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  sideMenuLinks: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    height: 40,
    width: vw(100),
    borderBottomWidth: 3,
    borderBottomColor: 'rgba(255,255,255,0.02)',
    padding: 10,
    zIndex: 10,
  },
  sideMenuText: {
    color: 'white',
    fontSize: 14,
  },
})

module.exports = homeStyles
	