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
const formStyles = EStyleSheet.create({

  mainPost: {
    width: vw(100),
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 50,
  },
  inputContainer: {
    width: vw(100),
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
    flex: 1,
  },
  inputBar: {
    backgroundColor: 'white',
    alignSelf: 'center',
    height: 40,
    width: vw(90),
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    padding: 5,
  },
   inputArea: {
    alignSelf: 'center',
    height: 150,
    width: vw(95),
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 15,
    padding: 5,
  },
  switchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: vw(95),
    alignItems: 'center',
    marginBottom: 15,
  },
  switchText: {
    paddingLeft: 15, 
  },
  toggleContainer: {
  	alignItems:'center',
  	flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f6f6f6',
    width: vw(100),
  },
  toggleBtn: {
  	margin: 5,
    width: 150,
    height: 40,
    alignItems: 'center',
    backgroundColor: red,
    justifyContent: 'center',
  },
  loginBtn: {
    alignSelf: 'center',
    width: vw(50),
    height: 40,
    alignItems: 'center',
    backgroundColor: red,
    justifyContent: 'center',
  },
  bodyContainer: {
  	alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    height: vh(100),
    backgroundColor: 'white',
  },
  selectHeader: {
    backgroundColor: 'rgba(0, 0, 0, .75)',
    width: vw(95),
    padding: 10,
    height: 40,
    color: 'white',
  }
})


module.exports = formStyles