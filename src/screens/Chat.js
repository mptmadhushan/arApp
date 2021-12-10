import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import {View, ActivityIndicator, StyleSheet, SafeAreaView} from 'react-native';
export default function Ecom() {
  const [visible, setVisible] = useState(false);
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        style={{flex: 1}}
        source={{uri: 'https://tharuprojectchat.000webhostapp.com/'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadStart={() => setVisible(true)}
        onLoad={() => setVisible(false)}
      />
      {visible && (
        <View style={styles.ActivityIndicatorStyle}>
          <ActivityIndicator color="#0000ff" size={'large'} />
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
