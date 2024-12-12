import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { colorMap } from '../constants/Colors';
import { typography } from '../constants/Typography';
import { useLoading } from '../context/LoadingContext';
import { useFileContext } from '../context/FileContext';
import { encryptFile } from '../utils/encryptFiles';

export function PasswordScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const { startLoading, stopLoading } = useLoading();
  const { files, clearFiles, directoryUri } = useFileContext();

  const handleComplete = async () => {
    if (files.length > 0 && password && directoryUri) {
      console.log('Iniciando la encriptación...');
      startLoading();
      navigation.navigate('LoadingScreen');
      try {
        for (const file of files) {
          console.log('Encriptando archivo:', file.uri);
          const encryptedFileUri = await encryptFile(file.uri, password, directoryUri);
          console.log('Archivo encriptado en:', encryptedFileUri);
        }
      } catch (error) {
        console.error('Error en la encriptación:', error);
      }
      clearFiles();
      stopLoading();
    } else {
      console.log('Archivos, contraseña o directorio faltantes.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/shield.png')} style={styles.image} />
      <Text style={styles.title}>Tu archivo está casi listo</Text>
      <Text style={styles.subtitle}>Solo falta una contraseña para protegerlo.</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa la contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Terminar" onPress={handleComplete} color={colorMap.secondary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: typography.medium,
    color: colorMap.darkpurple,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: typography.medium,
    color: colorMap.secondary,
  },
  input: {
    height: 40,
    borderColor: colorMap.secondary,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colorMap.foreground,
    width: '80%',
  },
});

export default PasswordScreen;
