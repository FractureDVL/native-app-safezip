import "./global.css"
import { useEffect, useState } from "react";
import { View, ActivityIndicator  } from 'react-native';
import Main from './src/screens/Main';
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileProvider } from "./src/context/FileContext";


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
     <>
      <SafeAreaView style={{flex: 1}}/>    
        <FileProvider>
            <Main/>
        </FileProvider>
      <SafeAreaView/>
     </>
  );
}

