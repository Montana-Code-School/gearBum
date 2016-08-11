import React, { Component } from 'react';
import ReactNative from 'react-native';
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
  findNodeHandle,
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
      photos: [],
      usersid: this.props.usersid,
      date: '',
      displayAddPhotos: false
    };
  }

  setLocation() {
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
    return new Promise((resolve, reject) =>{
      this.setState({displayAddPhotos: false})
      var options = {
        keyPrefix: "uploads/",
        bucket: "gearbum",
        region: "us-west-2",
        accessKey: accessKey,
        secretKey: secretKey,
        successActionStatus: 201
      }
      Promise.all(uri.map((img) => {
        var fileName = img.slice(36, -8)
        var photo = {
          uri: img,
          name: fileName + '.jpg',
          type: 'image/jpeg',
        }
        return RNS3.put(photo, options)
      }))
      .then((results) => {
        var photoURLs = this.state.photos
        results.map(response => {
          if (response.status !== 201) {
            reject("Failed to upload image to S3");
          }
          photoURLs = photoURLs.concat([response.body.postResponse.location])
        })
        this.setState({photos: photoURLs})
         resolve(console.log("Image upload success"))

      })
    })
  }

  getImage(uri){
    this.setState({imageUri: this.state.imageUri.concat([uri])})
  }
  
  geocodeAddress(){
    return new Promise((resolve, reject) => {
      console.log("ADDRESS", this.state.address)
      var self = this
      if(!this.state.address && !this.state.useLocation){
        reject("No Address Found")
      }
      if(this.state.useLocation){
        this.setLocation()
      }
      if(this.state.address && !this.state.useLocation){
        Geocoder.geocodeAddress(this.state.address).then(res => {
          self.setState({latitude: res[0].position.lat, longitude: res[0].position.lng})
          resolve({latitude: res[0].position.lat, longitude: res[0].position.lng})
        })
      }
    }) 
  }

  getDate(){
    return new Promise((resolve, reject) => {
      var currentDate = JSON.stringify(new Date())
      var date = currentDate.slice(0, -15)
      if(date === undefined){
        reject("No Date Set")
      }
      console.log('post date variable', date)
      this.setState({date: date})
      resolve()
      })
  }

  submitPost(){
    if(this.props.usersid){
      const {category, date, usersid, price, description, photos, title, latitude, longitude } = this.state
      console.log("STATE OF THE POST FXN", this.state)
      fetch(serverUrl + "/api/v1/equip/create", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({category, date, usersid, price, description, photos, title, latitude, longitude})
      })
      .then((response)=>response.json())
      .then(() => this._navigate('SearchGear'))
      .then((json)=> console.log('received this from the server', json))
      .catch(function(ex) {
        console.log('parsing failed', ex)
      })
    }
  }

  postEquip (){
    this.uploadImage(this.state.imageUri)
    .then(() => this.geocodeAddress())
    .then(() => this.getDate()) 
    .then(() => this.submitPost())
    .catch(function(ex) {
      console.log('submit post failed', ex)
    })
  }

  inputFocused (refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[refName]),
        110,
        true
      );
    }, 50);
  }

  render() {
    const menu = <Menu navigator={this.props.navigator} setUsersid={this.props.setUsersid}/>
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
        <ScrollView ref='scrollView'>
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
              ref='title'
              placeholder="Title"
              style={ loginPostStyles.inputBar }
              onFocus={() => this.inputFocused('title')}
              onChangeText={(title) => this.setState({title})}
              value={this.state.title}
            />
            <TextInput
              ref='price'
              placeholder="Price"
              style={ loginPostStyles.inputBar }
              onFocus={this.inputFocused.bind(this, 'price')}
              onChangeText={(price) => this.setState({price})}
              value={this.state.price}
            />
            <TextInput
              ref='description'
              placeholder="Description"
              style={ loginPostStyles.inputArea }
              multiline = {true}
              onFocus={this.inputFocused.bind(this, 'description')}
              onChangeText={(description) => this.setState({description})}
              value={this.state.description}
            />
            {this.state.useLocation ? <Text /> : 
              <TextInput
                ref='location'
                placeholder="Location"
                style={ loginPostStyles.inputBar }
                onFocus={this.inputFocused.bind(this, 'location')}
                onChangeText={(address) => this.setState({address})}
                value={this.state.address}
              />
            }
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
          <TouchableOpacity style={ loginPostStyles.loginBtn } onPress={ () => this.postEquip()}>
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