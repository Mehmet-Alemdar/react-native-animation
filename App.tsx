import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ScrollToIndex from './src/components/scrollToIndex';
import WaveThingy from './src/components/waveThingy';
import LoadingIndicator from './src/components/loadingIndicator';
import Switch from './src/components/switch';

export default function App() {
  // for Switch component
  const [isActive, setIsActive] = React.useState(false)

  return (
    <View style={styles.container}>
      <Switch 
        size={60} 
        onPress={() => {
          setIsActive((isActive) => !isActive)
        }} 
        isActive={isActive}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
