import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import 'expo-router/entry';

import './global.css';

export default function App() {
  return (
    <>
      <ScreenContent title="Home" path="App.tsx" />
      <StatusBar style="auto" />
    </>
  );
}
