


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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

const reactImageProject = React.createClass({
  getInitialState() {
    return {
      images: [],
      selected: '',
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
    <ScrollView style={styles.container}>
      <View style={styles.imageGrid}>
        { this.state.images.map((image) => {
            return (
              <TouchableHighlight onPress={this.props.getImage.bind(null, image.uri)} style={styles.image} key={image.uri}>
                <Image style={styles.image} source={{ uri: image.uri }} />
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