import "./global.css"
import { StatusBar } from 'expo-status-bar';
import { View, Platform  } from 'react-native';
import Main from './components/Main';

export default function App() {
  return (
    <View>
      {Platform.OS !== "web" && <StatusBar />}
      <Main />
    </View>
  );
}

