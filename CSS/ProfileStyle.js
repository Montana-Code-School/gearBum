import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
 } from 'react-native';

const window = Dimensions.get('window');
const profileStyles = StyleSheet.create({
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
  sideMenu: {
    backgroundColor: '#bc2025',
    flex: 1,
    width: window.width,
    height: window.height,
  },
  sideMenuBox: {
    width: 40,
    height: 40,
    backgroundColor: 'black',
  },
  userName: {
    color: 'grey',
    margin: 15,
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
  descriptionHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: window.width,
    backgroundColor: '#bc2025',
  },
  descriptionContainer: {
    width: window.width,
    backgroundColor: '#f6f6f6',
    padding: 30,
    alignItems: 'center'
  },
})

module.exports = profileStyles