import React, { Component } from 'react';
import {
  StyleSheet
 } from 'react-native';



const loginPostStyles = StyleSheet.create({
  backgroundImage: {//not currently in use
  flex: 1,
  },
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
    borderWidth: 1,
    margin: 15,
    padding: 5,
  },
   inputArea: {
    height: 150,
    width: 350,
    borderColor: 'black',
    borderWidth: 1,
    margin: 15,
    padding: 5,
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
    flex: 1,
  },
  toggleContainer: {
  	alignItems:'center',
  	flex: 1,
    flexDirection: 'row',
  },
  toggleBtn: {
  	margin: 5,
    width: 150,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#bc2025',
    justifyContent: 'center',
  },
  loginBtn: {
    margin: 5,
    width: 350,
    height: 40,
    alignItems: 'center',
    backgroundColor: '#bc2025',
    justifyContent: 'center',
  },
  bodyContainer: {
  	alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  selectHeader: {
    backgroundColor: 'rgba(0, 0, 0, .75)',
    padding: 10,
    height: 40,
    color: 'white',
  }
})


module.exports = loginPostStyles