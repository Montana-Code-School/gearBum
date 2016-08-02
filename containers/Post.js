import React, { Component } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  View,
  TextInput,
  PickerIOS,
  NativeModules,
  ScrollView,
  MapView,
} from 'react-native';
var PickerItemIOS = PickerIOS.Item;
import Geocoder from 'react-native-geocoder';
import Menu from '../components/SideMenu';
import Button from '../components/Button';
import { RNS3 } from 'react-native-aws3';
const SideMenu = require('react-native-side-menu');
import loginPostStyles from '../CSS/LoginPostStyle';
import homeStyles from '../CSS/HomeStyle';
var ImageUpload = require('./ImageUpload').component;
var imageUploadStyles = require ('../CSS/ImageUploadStyle');
import {serverUrl} from '../constants/serverConstants';
import {accessKey, secretKey} from '../keys'

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: ['Bike', 'Snow', 'Camp', 'Boat', 'Golf'],
      category: 'Bike',
      title: '',
      price: '',
      description: '',
      useLocation: false,
      latitude: 0,
      longitude: 0,
      address: '',
      imageUri: [],
      imageAddress: '',
      displayAddPhotos: false
    };
  }

  componentDidMount() {
    if(this.state.useLocation){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var lat = parseFloat(position.coords.latitude);
          var long = parseFloat(position.coords.longitude);
          this.setState({latitude: lat, longitude: long});
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      this.watchID = navigator.geolocation.watchPosition((position) => {
        var newLocation = JSON.stringify(position);
        this.setState({location: newLocation});
      });
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }  

  _navigate(name) {
    this.props.navigator.push({
      name: name,
      passProps: {
        name: name
      }
    })
  }

  state = {
    isOpen: false,
  }

  toggleMenu(){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  submitPost(){
    this.uploadImage(this.state.imageUri)
    this.geocodeAddress()
    const {category, price, description, imageAddress, title, latitude, longitude } = this.state
    fetch(serverUrl + "/api/v1/equip/create", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({category, price, description, imageAddress, title, latitude, longitude})
    })
    .then((response)=>response.json())
    .then((json)=> console.log('received this from the server', json))
    .catch(function(ex) {
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

  uploadImage(uri){
    this.setState({displayAddPhotos: false})
    var options = {
      keyPrefix: "uploads/",
      bucket: "gearbum",
      region: "us-west-2",
      accessKey: accessKey,
      secretKey: secretKey,
      successActionStatus: 201
    }
    uri.map((img) => {
      var fileName = img.slice(36, -8)
      var photo = {
        uri: img,
        name: fileName + '.jpg',
        type: 'image/jpeg',
      }
      RNS3.put(photo, options).then(response => {
        if (response.status !== 201) {
          throw new Error("Failed to upload image to S3");
        }
        this.setState({imageAddress: response.body.postResponse.location})
      });
    })
  }

  getImage(uri){
    this.setState({imageUri: this.state.imageUri.concat([uri])})
  }
  
  geocodeAddress(){
    if(this.state.address){
      Geocoder.geocodeAddress(this.state.address).then(res => {
        this.setState({latitude: res[0].position.lat, longitude: res[0].position.lng})
      })
    }
  }

  render() {
    const menu = <Menu navigator={this.props.navigator} />
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
        <View style={ loginPostStyles.mainPost }>
         <View style={ homeStyles.headerContainer }>
          <Text style={ homeStyles.headerText }>
            GEARBUM
          </Text>
        </View>
        <ScrollView>
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
              placeholder="Title"
              style={ loginPostStyles.inputBar }
              onChangeText={(title) => this.setState({title})}
              value={this.state.title}
            />
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
              onChangeText={(address) => this.setState({address})}
              value={this.state.address}
            />
            <View style={ loginPostStyles.switchContainer }>
              <Switch
                onTintColor= "#bc2025"
                tintColor= "#d3d3d3"
                thumbTintColor= "#d3d3d3"
                onValueChange={(value) => this.setState({useLocation: value})}
                value={this.state.useLocation} />
              <Text style={ loginPostStyles.switchText }>
                Use my current location
              </Text>
            </View>
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
          </ScrollView>
        </View>
      <Button
         style={ homeStyles.menuIconContainer} 
         onPress={() => this.toggleMenu()}>
        <Image
          style={ homeStyles.imgMenuIcon}
          source={require('../img/whiteGear.png')} 
        />
      </Button>
      </SideMenu>
    );
  }
}

module.exports = Post