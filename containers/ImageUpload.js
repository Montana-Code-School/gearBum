


const React = require('react');
const ReactNative = require('react-native');

const {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  CameraRoll,
  TouchableHighlight,
  NativeModules,
} = ReactNative;

var imageUploadStyles = require ('../CSS/ImageUploadStyle')

const reactImageProject = React.createClass({
  getInitialState() {
    return {
      images: [],
    };
  },

  componentDidMount() {
    const fetchParams = {
      first: 25,
    };
    CameraRoll.getPhotos(fetchParams)
    .then(this.storeImages)
    .catch(this.logImageError)
  },

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    this.setState({
      images: images,
    });
  },

  logImageError(err) {
    console.log(err);
  },

  render() {
  return (
    <ScrollView style={imageUploadStyles.container}>
      <View style={imageUploadStyles.firstImageGrid}>
        { this.state.images.map((image) => {
            return (
              <TouchableHighlight onPress={this.props.getImage.bind(null, image.uri)} style={imageUploadStyles.image} key={image.uri}>
                <Image style={imageUploadStyles.image} source={{ uri: image.uri }} />
              </TouchableHighlight>
            );
          })
        }
      </View>
    </ScrollView>
    );
  }
});

exports.component = reactImageProject