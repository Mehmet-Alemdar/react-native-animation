import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ScrollToIndex from './src/components/scrollToIndex';
import WaveThingy from './src/components/waveThingy';
import LoadingIndicator from './src/components/loadingIndicator';

export default function App() {
  return (
    <View style={styles.container}>
      <LoadingIndicator size={100} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010100',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
