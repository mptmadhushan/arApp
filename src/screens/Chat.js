import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {icons, images, SIZES, COLORS, FONTS} from '../helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';
import Loader from '../components/Loader';

export default function Chat() {
  const [loading, setLoading] = React.useState(true);
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // });

  const renderIndicator = (
    <View>
      <Loader />
    </View>
  );
  return (
    <WebView
      renderLoading={() => {
        return renderIndicator();
      }}
      source={{uri: 'https://kosalaproject.000webhostapp.com/'}}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: COLORS.white,
    padding: 1,
    borderRadius: 50,
    marginRight: 10,
    marginLeft: SIZES.width * 0.05,
  },
  bot: {
    // height: '100%',
    // width: SIZES.width * 0.8,
    padding: 5,
    marginLeft: SIZES.width * 0.005,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.primary,
  },
  avatarUser: {
    backgroundColor: COLORS.white,
    padding: 1,
    borderRadius: 50,
    marginRight: 10,
    // marginLeft: SIZES.width * 0.05,
  },
  userChat: {
    // height: '100%',
    // width: SIZES.width * 0.8,
    padding: 5,
    // marginLeft: SIZES.width * 0.005,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.secondary,
  },
  chatWindow: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  SectionStyle: {
    borderRadius: 10,
    borderColor: COLORS.white,
    borderWidth: 1,
    height: 40,
    margin: 5,
  },
  inputStyle: {
    flex: 1,
    color: COLORS.white,
    paddingLeft: 15,
    // paddingRight: 15,
    width: SIZES.width * 0.7,
  },
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
  },
  rowFlexUser: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
  },
  text001: {
    color: COLORS.white,
    marginRight: 16,
    fontSize: 15,
  },
  text002: {
    color: COLORS.white,
    marginRight: 16,
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
    margin: 5,
    flexDirection: 'row',
    flex: 1,
    maxWidth: SIZES.width * 0.3,
    height: 40,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
});
