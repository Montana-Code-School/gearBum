import React, { Component } from 'react';
import {
  StyleSheet
 } from 'react-native';


const profileStyles = StyleSheet.create({
  profileContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  picBorder: {
    borderColor: 'grey',
    borderWidth: 3,
  },
  pic: {
    resizeMode: 'contain',
  }
})

module.exports = profileStyles