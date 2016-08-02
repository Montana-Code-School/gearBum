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
      price: '',
      description: '',
      latitude: 0,
      longitude: 0,
      address: '',
      imageUri: [],
      displayAddPhotos: false
    };
  }

  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       var lat = parseFloat(position.coords.latitude);
  //       var long = parseFloat(position.coords.longitude);
  //       this.setState({latitude: lat, longitude: long})
  //       console.log('LOOOCATIONNNN', this.state.latitude, this.state.longitude);
  //     },
  //     (error) => alert(error.message),
  //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  //   );
  //   this.watchID = navigator.geolocation.watchPosition((position) => {
  //     var newLocation = JSON.stringify(position);
  //     this.setState({location: newLocation});
  //   });
  // }

  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchID);
  // }

  // getLocation() {
  //   if(this.state.location === ''){
  //     this.setState({location: 'Please Enable Location Services for Accurate Location'})
  //   }
  // }   

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
    console.log(this.state.isOpen)
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen, });
  }

  submitPost(){
    const {category, price, description, latitude, longitude} = this.state
    this.uploadImage(this.state.imageUri[0])
    console.log('the state', this.state)
    fetch(serverUrl+ "/api/v1/equip/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({category, price, description, latitude, longitude})
    }).then(function(response) {
      // console.log('response', response.json())
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
                  // <Image style={ imageUploadStyles.image } source={{ uri: image }} key={image}/>
                  <Text> Selected Image </Text>
                )}          
              </View>
            </ScrollView>
        </View>
      )
    }      
  }

  uploadImage(uri){
    this.setState({displayAddPhotos: false})
    
    console.log('image uri', uri)
    console.log('secret key', secretKey)
    var options = {
      keyPrefix: "uploads/",
      bucket: "gearbum",
      region: "us-west-2",
      accessKey: accessKey,
      secretKey: secretKey,
      successActionStatus: 201
    }
    var photo = {
      uri: uri,
      name: 'newImage.jpg',
      type: 'image/jpeg',
    }
    RNS3.put(photo, options).then(response => {
      console.log('Promise Resolved', response)
      if (response.status !== 201) {
        throw new Error("Failed to upload image to S3");
      }
      console.log(response.body);
    }); 

    // var form = new FormData();
    // form.append("ProfilePicture", photo);
    // fetch(
    //   Constants.API_USER + 'me/profilePicture',
    //   {
    //     body: form,
    //     method: "PUT",
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       'Authorization': 'Bearer ' + user.token
    //     }
    //   }
    // ).then((response) => response.json())
    // .catch((error) => {
    //   alert("ERROR " + error)
    // })
    // .then((responseData) => {
    //   alert("Succes "+ responseData)
    // }).done();


  }

  getImage(uri){
    console.log(uri)
    this.setState({imageUri: this.state.imageUri.concat([uri])})
  }

  hideMap(){
    this.state.address
  }

  render() {
    const menu = <Menu navigator={this.props.navigator} />
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={(isOpen) => this.updateMenuState(isOpen)}>
      <ScrollView style={ loginPostStyles.scrollView }> 
        <View style={ loginPostStyles.mainPost }>
         <View style={ homeStyles.headerContainer }>
          <Text style={ homeStyles.headerText }>
            GEARBUM
          </Text>
        </View>
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
            <MapView
              region={{latitude: this.state.latitude, longitude: this.state.longitude, latitudeDelta: 0.025, longitudeDelta: 0.025}}
              annotations={[{latitude: this.state.latitude, longitude: this.state.longitude}]}
              style={ homeStyles.map }
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