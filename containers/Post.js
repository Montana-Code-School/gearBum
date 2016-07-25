import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  View,
  TextInput,
  PickerIOS,
  NativeModules,
  ScrollView
} from 'react-native';
// var { Icon } = require ('react-native-icons');
var PickerItemIOS = PickerIOS.Item;
const SideMenu = require('react-native-side-menu'); 

import loginPostStyles from '../CSS/LoginPostStyle';
import homeStyles from '../CSS/HomeStyle';
var ImageUpload = require('./ImageUpload').component;
var imageUploadStyles = require ('../CSS/ImageUploadStyle');

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: ['Bike', 'Snow', 'Camp', 'Boat', 'Golf'],
      category: 'Bike',
      price: '',
      description: '',
      location: '',
      image: [],
      imageUri: [],
      displayAddPhotos: false
    };
  }

  _navigate(name) {
    this.props.navigator.push({
      name: name,
      passProps: {
        name: name
      }
    })
  }

  submitPost(){
    console.log('the state', this.state)
    fetch("http://localhost:3000/api/v1/equip/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(this.state)
    }).then(function(response) {
      return response.json()
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  addPhotos() {
    var self = this
    if(this.state.displayAddPhotos) {
      return (
        <View>
          <ImageUpload getImage={this.getImage.bind(this)}/>
          <ScrollView style={ imageUploadStyles.addImageContainer } stickyHeaderIndices={[0]}>
            <Text style={ loginPostStyles.selectHeader }>Selected Images: </Text>
            <View style={ imageUploadStyles.addImageGrid }>
              {self.state.imageUri.map((image)=>
                <Image style={ imageUploadStyles.image } source={{ uri: image }} key={image}/>
              )}          
            </View>
          </ScrollView>
        </View>
      )
    }      
  }
  
  getImage(uri){
    this.setState({imageUri: this.state.imageUri.concat([uri])})
    NativeModules.ReadImageData.readImage(uri, (image) => {
      this.setState({image: this.state.image.concat([image])})
    })
  }

  render() {
    return (
      <ScrollView style={ loginPostStyles.scrollView }> 
        <View style={ loginPostStyles.mainPost }>
          <TouchableHighlight onPress={ () => this.props.navigator.pop() }>
            <Text>
              Home
            </Text>
          </TouchableHighlight>
          <View style={ loginPostStyles.inputContainer }>
            <View>
              <Text>Please choose a gear category:</Text>
                <PickerIOS
                  selectedValue={this.state.category}
                  onValueChange={(category) => this.setState({category: category})}>
                  {this.state.categoryList.map((category, i) => (
                    <PickerItemIOS
                      key={category}
                      value={category}
                      label={category}
                    />
                  ))}
                </PickerIOS>
            </View>
            <TextInput
              placeholder="Price"
              style={ loginPostStyles.inputBar }
              onChangeText={(price) => this.setState({price})}
              value={this.state.price}
            />
            <TextInput
              placeholder="Description"
              style={ loginPostStyles.inputArea }
              multiline = {true}
              onChangeText={(description) => this.setState({description})}
              value={this.state.description}
            />
            <TextInput
              placeholder="Location"
              style={ loginPostStyles.inputBar }
              onChangeText={(location) => this.setState({location})}
              value={this.state.location}
            />
            <TouchableOpacity
              style={ loginPostStyles.loginBtn } 
              onPress={ () => this.setState({displayAddPhotos: !this.state.displayAddPhotos})}
            >
              <Text style={ homeStyles.textWhite }>
                Select Photo
              </Text>
            </TouchableOpacity>
            {this.addPhotos()}
          </View>
          <TouchableOpacity style={ loginPostStyles.loginBtn } onPress={ () => this.submitPost()}>
            <Text style={ homeStyles.textWhite }>
              Post your listing
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

module.exports = Post