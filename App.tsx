import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ScrollToIndex from './src/components/scrollToIndex';
import WaveThingy from './src/components/waveThingy';

export default function App() {
  return (
    <View style={styles.container}>
      <WaveThingy />
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
