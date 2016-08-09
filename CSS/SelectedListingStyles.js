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
  listingContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  imgContainer: {
    flex: 1, 
    overflow: 'hidden', 
    width: vw(100),
    height: vh(90),
  }, 
  img: {
    resizeMode: 'cover',
    width: vw(100),
    height: 250,
  },
  imgTextContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1,
    height:75,
  },
  imgText: {
    textAlign: 'right', 
    color: 'white', 
    padding: 10, 
    fontSize: 16,
    fontWeight: 'bold',
    width: 90,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 15,
  },
  equipTitle: {
    height: 80,
    width: vw(80),
    fontSize: 30,
    fontWeight: 'bold',
    padding: 15,
  },
  userInfoContainer: {
    height: 60,
    width: vw(90),
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userInfoText: {
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 18,
  },
  userImgContainer: {
    overflow: 'hidden',
  },
  equipText: {
    padding: 15,
    fontSize: 14,
    fontWeight: '200',
    lineHeight: 18,
  },
  map: {
    height: 200,
    width: vw(100),
  },
  mailContainer: {
    marginTop: 10,
    height: 60,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mailImg: {
    width: vw(10),
    height: vw(10),
    marginRight: 5,
  },
  mailText: {
    fontSize: 16,
    lineHeight: 18,
  },  
})

  module.exports = selectedListingStyles