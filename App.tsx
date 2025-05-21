import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import 'expo-router/entry';
import { View } from 'react-native';

import './global.css';

export default function App() {
  return (
     <View>
      <StatusBar style="light" />
    </View>
  );
}
