/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';
import {SIZES, COLORS, FONTS} from '../helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import OpenApplication from 'react-native-open-application';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';

export default function Home({navigation, route}) {
  // const response = route.params.response;
  // const email = response?.user.email;
  // const name = email.split('@')[0];

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response.assets[0].uri);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const reference = storage().ref(response.assets[0].fileName);
        const task = reference.putFile(response.assets[0].uri);
        task
          // .then(response => response.json())
          .then(response => {
            console.log('response 🔥', response.flag);
            console.log(response);
            OpenApplication.openApplication('com.DefaultCompany.ArFurniture');
          })
          .catch(err => console.error(err));
      }
    });
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/food2.jpeg')}>
      <LinearGradient
        colors={['transparent', COLORS.black, COLORS.black]}
        style={styles.overlay}>
        <View
          style={{
            marginTop: SIZES.height * 0.3,
          }}>
          <Text style={styles.title2}>Hello Fred!</Text>
          <Text style={styles.title21}>What's new today?</Text>
        </View>

        {/* <View style={styles.rowNorm}> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Instruction')}
          style={styles.slide1}>
          <View style={styles.centerFlex}>
            <Icon
              name="ios-information-circle-outline"
              size={50}
              color={COLORS.white}
            />
            <Text style={styles.text001}>Instructions</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Chat')}
          style={styles.slide1}>
          <View style={styles.centerFlex}>
            <Icon name="chatbubbles-outline" size={50} color={COLORS.white} />
            <Text style={styles.text001}>Chat Bot</Text>
          </View>
        </TouchableOpacity>
        {/* </View> */}
      </LinearGradient>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.black},
  slide1: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    maxWidth: SIZES.width * 0.7,
    height: SIZES.width * 0.25,
    marginLeft: SIZES.width * 0.15,
    marginRight: SIZES.width * 0.15,
    marginTop: SIZES.height * 0.02,
  },
  centerFlex: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  title2: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: SIZES.width * 0.06,
    fontSize: 25,
    textAlign: 'center',
  },
  title21: {
    color: COLORS.white,
    marginLeft: SIZES.width * 0.06,
    fontSize: 20,
    textAlign: 'center',
  },
  text001: {
    color: COLORS.white,
    fontSize: 15,
  },
  overlay: {
    marginTop: SIZES.height * 0.2,
    height: SIZES.height * 0.8,
    // alignItems: 'center',
  },
  title1: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: SIZES.width * 0.06,
  },
  rowNorm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    flexWrap: 'wrap',
    maxWidth: SIZES.width,
    marginTop: SIZES.height * 0.01,
    marginLeft: SIZES.width * 0.06,
    marginRight: SIZES.width * 0.06,
  },
});
