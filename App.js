import "./global.css"
import { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Platform , Text, ActivityIndicator  } from 'react-native';
import Main from './components/Main';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const loadFonts = async () => {
  await Font.loadAsync({
    'Rethink-Bold': require('./assets/fonts/RethinkSans-Bold.ttf'),
    'Rethink-ExtraBold': require('./assets/fonts/RethinkSans-ExtraBold.ttf'),
    'Rethink-Medium': require('./assets/fonts/RethinkSans-Medium.ttf'),
    'Rethink-Regular': require('./assets/fonts/RethinkSans-Regular.ttf'),
    'Rethink-SemiBold': require('./assets/fonts/RethinkSans-SemiBold.ttf'),
  });
};

export default function App() {

  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    loadFonts()
      .then(() => setIsFontLoaded(true))
      .catch((error) => console.error(error));
  }, []);

  if (!isFontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#433878" />
      </View>
    );
  }

  return (
    <View>
      {Platform.OS !== "web" && <StatusBar />}
      <Main />
    </View>
  );
}

