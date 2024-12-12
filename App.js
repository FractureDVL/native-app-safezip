import "./global.css";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FileProvider } from "./src/context/FileContext";
import { LoadingProvider } from "./src/context/LoadingContext";
import { enableScreens } from 'react-native-screens';
import LoadingScreen from './src/screens/LoadingScreen';
import PasswordScreen from './src/screens/PasswordScreen';
import DecryptScreen from './src/screens/DecryptScreen';
import Home from "./src/screens/Home";
import SelectedFiles from "./src/screens/SelectedFiles";
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

const Stack = createNativeStackNavigator();

const loadFonts = async () => {
  await Font.loadAsync({
    "Rethink-Bold": require("./src/assets/fonts/RethinkSans-Bold.ttf"),
    "Rethink-ExtraBold": require("./src/assets/fonts/RethinkSans-ExtraBold.ttf"),
    "Rethink-Medium": require("./src/assets/fonts/RethinkSans-Medium.ttf"),
    "Rethink-Regular": require("./src/assets/fonts/RethinkSans-Regular.ttf"),
    "Rethink-SemiBold": require("./src/assets/fonts/RethinkSans-SemiBold.ttf"),
  });
};

enableScreens();

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    loadFonts()
      .then(() => setIsFontLoaded(true))
      .catch((error) => console.error(error));
  }, []);

  if (!isFontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#433878" />
      </View>
    );
  }

  return (
    <FileProvider>
      <LoadingProvider>
        <NavigationContainer style={{ backgroundColor: 'white' }}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name="Files" component={SelectedFiles} options={{ title: 'Tus Archivos' }} />
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PasswordScreen" component={PasswordScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DecryptScreen" component={DecryptScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </LoadingProvider>
    </FileProvider>
  );
}
