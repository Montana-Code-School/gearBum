import React, { Component } from 'react';
import {
  StyleSheet
 } from 'react-native';



const loginPostStyles = StyleSheet.create({
  mainPost: {
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputBar: {
    height: 40,
    width: 350,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    margin: 15,
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  toggleContainer: {
  	alignItems:'center',
  	flex: 1,
    flexDirection: 'row',
  },
  toggleBtn: {
  	margin: 5,
  },
  bodyContainer: {
  	alignItems: 'center',
  }
})


module.exports = loginPostStyles