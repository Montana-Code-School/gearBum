import React, { Component } from 'react';
import {
  StyleSheet
 } from 'react-native';


const activityStyles = StyleSheet.create({
    mainActivity: {
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  picMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pic: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 20,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 5,
    padding: 50,
  },
  picBtn: {
    margin:20,
    height:110
  },
})

module.exports = activityStyles
