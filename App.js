import "./global.css"
import { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Platform, ActivityIndicator  } from 'react-native';
import Main from './src/screens/Main';
import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    'Rethink-Bold': require('./src/assets/fonts/RethinkSans-Bold.ttf'),
    'Rethink-ExtraBold': require('./src/assets/fonts/RethinkSans-ExtraBold.ttf'),
    'Rethink-Medium': require('./src/assets/fonts/RethinkSans-Medium.ttf'),
    'Rethink-Regular': require('./src/assets/fonts/RethinkSans-Regular.ttf'),
    'Rethink-SemiBold': require('./src/assets/fonts/RethinkSans-SemiBold.ttf'),
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
    <View className="flex-1">
      {Platform.OS !== "web" && <StatusBar />}
      <Main/>
    </View>
  );
}

