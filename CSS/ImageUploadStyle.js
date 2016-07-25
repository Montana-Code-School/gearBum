
import React, { Component } from 'react';
import {
  StyleSheet
 } from 'react-native';

const imageUploadStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    width: 350,
    height: 300,
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
  },
  addImageContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    width: 350,
    height: 200,
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
  },
  firstImageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  addImageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
    marginBottom: 10,
  },
});

module.exports = imageUploadStyles