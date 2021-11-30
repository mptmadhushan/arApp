import React from 'react';
import {WebView} from 'react-native-webview';

export default function Chat() {
  return (
    <WebView source={{uri: 'https://tharuprojectchat.000webhostapp.com/'}} />
  );
}
