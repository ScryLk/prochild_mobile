import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import 'expo-router/entry';
import { View } from 'react-native';
import { useEffect } from 'react';
import { Appearance } from 'react-native';

import './global.css';

export default function App() {
  useEffect(() => {
    Appearance.setColorScheme('light'); 
  }, []);
  return (
     <View>
      <StatusBar style="light" />
    </View>
  );
}
