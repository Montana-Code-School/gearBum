import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
 } from 'react-native';


const window = Dimensions.get('window');
const selectedListingStyles = StyleSheet.create({
  mainSelectedListing: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
  	marginTop: 50,
  	marginBottom: 20,
  },
})

  module.exports = selectedListingStyles