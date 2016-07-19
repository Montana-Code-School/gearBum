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
  btn: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 300,
  },
})

module.exports = homeStyles
	