/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {RNCamera} from 'react-native-camera';
// import {BASE_URL} from '../../Config/index';
// import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'react-native-image-picker';
import {icons, images, SIZES, COLORS, FONTS} from '../helpers';
import LinearGradient from 'react-native-linear-gradient';

const MainScreen = ({routes, navigation}) => {
  let camera;
  const [spinner, setSpinner] = useState(false);
  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response.assets[0].uri);
      setSpinner(true);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let formData = new FormData();
        formData.append('listFile', {
          uri: response.assets[0].uri,
          type: 'image/jpg',
          name: 'image.jpg',
        });
        fetch(`{BASE_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        })
          .then(response => response.json())
          .then(response => {
            console.log('response 🔥', response.flag);
            console.log(response);
            setSpinner(false);
            storeData(response);
          })
          .catch(err => console.error(err));
      }
    });
  };
  async function takePicture() {
    setSpinner(true);
    if (camera) {
      const options = {
        quality: 0.5,
        base64: true,
        // orientation: 'landscape',
        // forceUpOrientation: true,
        // fixOrientation: true,
      };
      const data = await camera.takePictureAsync(options);
      const baseImage = data.base64;
      console.log('hello camera');
      let formData = new FormData();

      formData.append('listFile', {
        uri: data.uri,
        type: 'image/jpg',
        name: 'image.jpg',
      });
      fetch(`{BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
        .then(response => response.json())
        .then(response => {
          console.log('response 🔥', response.flag);
          console.log(response);

          setSpinner(false);

          storeData(response);
        })
        .catch(err => console.error(err));
    }
  }
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      // await AsyncStorage.setItem('@image_search', jsonValue);
      console.log(jsonValue);
      navigation.navigate('ImageSearchResultNew');
    } catch (e) {}
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          height: SIZES.height * 0.8,
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        {/* <View style={{width: '100%', height: SIZES.height * 0.8}}> */}
        <RNCamera
          ref={ref => (camera = ref)}
          style={{flex: 1}}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        {/* </View> */}
      </View>
      <LinearGradient
        colors={['transparent', COLORS.black, COLORS.black]}
        style={styles.overlay}>
        <View style={styles.rowFlex}>
          <TouchableOpacity
            onPress={() => launchImageLibrary()}
            style={styles.slide1}>
            <View style={styles.centerFlex}>
              {/* <Icon name="rocket-outline" size={50} color={COLORS.white} /> */}
              <Text style={styles.text001}>Upload</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => takePicture()} style={styles.slide1}>
            <View style={styles.centerFlex}>
              {/* <Icon name="rocket-outline" size={50} color={COLORS.white} /> */}
              <Text style={styles.text001}>Capture</Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
        // loading={loading}
        dark={true}
        color={COLORS.primary}
        onPress={() => takePicture()}
        label={'Capture'}
      /> */}
          {/* <TouchableOpacity
        // loading={loading}
        dark={true}
        color={COLORS.primary}
        label={'Upload'}
      /> */}
        </View>
      </LinearGradient>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  centerFlex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  overlay: {
    marginTop: -SIZES.height * 0.2,
    height: SIZES.height * 0.7,
  },
  rowFlex: {
    marginTop: SIZES.height * 0.2,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
  },
  text001: {
    color: COLORS.white,
    fontSize: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: COLORS.black,
  },
  slide1: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: SIZES.width * 0.2,
    maxHeight: SIZES.width * 0.15,
  },
});
