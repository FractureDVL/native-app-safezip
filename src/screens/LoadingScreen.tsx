import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colorMap } from '../constants/Colors';
import { typography } from '../constants/Typography';
import { useLoading } from '../context/LoadingContext';
import { useFileContext } from '../context/FileContext';

const LoadingScreen = ({ navigation }) => {
  const { isLoading } = useLoading();
  const { option } = useFileContext();

  useEffect(()=>{
    if(!isLoading){
      navigation.navigate('Home')
    }
  },[isLoading])

  const loadingText = option === "compress" ? "Comprimiendo archivos..." : "Cifrando archivos..."

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colorMap.secondary} />
      <Text style={styles.text}>{loadingText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorMap.background,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: typography.semibold,
    color: colorMap.secondary,
  },
});

export default LoadingScreen;
