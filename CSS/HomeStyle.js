import React, { Component } from 'react';
import {
  StyleSheet
 } from 'react-native';


const homeStyles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
    color: '#bc2025',
  },
})

module.exports = homeStyles
	