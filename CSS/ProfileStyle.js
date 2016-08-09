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
  scrollView: {
    height: vh(65),
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
  userGearContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  userGearTouch: {
    width: vw(28),
    height: vw(28),
    margin: vw(2),
  }, 
  userGearImg: {
    resizeMode: 'cover',
    width: vw(28),
    height: vw(28),
  },
  userGearText: {
    paddingTop: 3,
    textAlign: 'center',
    width: vw(28),
    height: 20,
    marginTop: vw(22),
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
   noGearText: {
    paddingTop: 3,
    textAlign: 'center',
    height: 20,
    marginTop: 10,
    fontSize: 10,
  },
  loginBtn: {
    marginTop: 10,
    alignSelf: 'center',
    width: vw(50),
    height: 40,
    alignItems: 'center',
    backgroundColor: red,
    justifyContent: 'center',
  },
})

module.exports = profileStyles