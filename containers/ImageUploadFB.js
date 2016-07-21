'use strict';


const React = require('react');
const ReactNative = require('react-native');
const {
  CameraRoll,
  Image,
  Slider,
  StyleSheet,
  Switch,
  Text,
  View,
  TouchableOpacity
} = ReactNative;

const CameraRollView = require('../components/cameraRoll');

const AssetScaledImageExampleView = require('../components/AssetScaledImageExample');

const CAMERA_ROLL_VIEW = 'camera_roll_view';

const CameraRollExample = React.createClass({

  getInitialState() {
    return {
      groupTypes: 'SavedPhotos',
      sliderValue: 1,
      bigImages: false,
      batchSize: 2,
    };
  },

  render() {
    return (
      <View>
        <CameraRollView
          ref={CAMERA_ROLL_VIEW}
          batchSize={1}
          groupTypes={this.state.groupTypes}
          renderImage={this._renderImage}
        />
      </View>
    );
  },

  loadAsset(asset){
    if (this.props.navigator) {
      this.props.navigator.push({
        title: 'Camera Roll Image',
        component: AssetScaledImageExampleView,
        backButtonTitle: 'Back',
        passProps: { asset: asset },
      });
    }
  },

  _renderImage(asset) {
    const imageSize =  75;
    const imageStyle = [styles.image, {width: imageSize, height: imageSize}];
    return (
      <TouchableOpacity key={asset} onPress={ this.loadAsset.bind( this, asset ) }>
        <View style={styles.row}>
          <Image
            source={asset.node.image}
            style={imageStyle}
          />
        </View>
      </TouchableOpacity>
    );
  },

  _onSliderChange(value) {
    const options = CameraRoll.GroupTypesOptions;
    const index = Math.floor(value * options.length * 0.99);
    const groupTypes = options[index];
    if (groupTypes !== this.state.groupTypes) {
      this.setState({groupTypes: groupTypes});
    }
  },

  _onSwitchChange(value) {
    this.refs[CAMERA_ROLL_VIEW].rendererChanged();
    this.setState({ bigImages: value });
  }
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  url: {
    fontSize: 9,
    marginBottom: 14,
  },
  image: {
    margin: 4,
  },
  info: {
    flex: 1,
  },
});

exports.title = 'Camera Roll';
exports.description = 'Example component that uses CameraRoll to list user\'s photos';
exports.examples = [
  {
    title: 'Photos',
    render(): ReactElement<any> { return <CameraRollExample />; }
  }
];
exports.component = CameraRollExample


