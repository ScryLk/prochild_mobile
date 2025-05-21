import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import 'expo-router/entry';
import { View } from 'react-native';

import './global.css';

export default function App() {
  return (
     <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar style="light" />
    </View>
  );
}
