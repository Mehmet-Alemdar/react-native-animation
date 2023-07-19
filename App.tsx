import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import ScrollToIndex from './src/components/scrollToIndex';
import WaveThingy from './src/components/waveThingy';
import LoadingIndicator from './src/components/loadingIndicator';
import Switch from './src/components/switch';
import GalleryView from './src/components/galleryView';
import ImageFocus from './src/components/imageFocusing';
import InstagramPost from './src/components/instagram/instagramPost/instagramPost';
import ListComponent from './src/components/list';

export default function App() {
  // for Switch component
  const [isActive, setIsActive] = React.useState(false)
  return (
    <View style={styles.container}>
      <ListComponent />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
