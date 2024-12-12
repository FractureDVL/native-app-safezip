import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { colorMap } from '../constants/Colors';
import { typography } from '../constants/Typography';
import { useLoading } from '../context/LoadingContext';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { decryptFile } from '../utils/decryptFiles';
import FileItem from '../components/FileItem';

export function DecryptScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [directoryUri, setDirectoryUri] = useState('');
  const { startLoading, stopLoading } = useLoading();

  const handleSelectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (!result.canceled && result.assets) {
        setEncryptedFile(result.assets[0]);
        console.log('Archivo seleccionado:', result.assets[0]);
      }
    } catch (error) {
      console.error('Error al seleccionar el archivo:', error);
    }
  };

  const handleSelectDirectory = async () => {
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        setDirectoryUri(permissions.directoryUri);
        console.log('Directorio seleccionado:', permissions.directoryUri);
      } else {
        console.log('Permiso denegado');
      }
    } catch (error) {
      console.error('Error al seleccionar el directorio:', error);
    }
  };

  const handleDecrypt = async () => {
    if (encryptedFile && password && directoryUri) {
      console.log("Desencriptando...");
      startLoading();
      try {
        const decryptedFileUri = await decryptFile(encryptedFile.uri, password, directoryUri);
        console.log('Archivo desencriptado en:', decryptedFileUri);
        Alert.alert('Desencriptación Exitosa', 'El archivo se ha desencriptado correctamente.');
      } catch (error) {
        console.error('Error en la desencriptación:', error);
        Alert.alert('Error', 'La contraseña es incorrecta o hubo un problema con la desencriptación.');
      }
      stopLoading();
    } else {
      console.log('Archivo encriptado, contraseña o directorio faltantes.');
    }
  };

  const handleRemoveFile = (fileUri) => {
    setEncryptedFile(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={require('../assets/shield.png')} style={styles.image} />
        <Text style={styles.title}>Desencriptar Archivo</Text>

        {!encryptedFile && (
          <TouchableOpacity style={styles.filePickerContainer} onPress={handleSelectFile}>
            <Text style={styles.filePickerText}>Selecciona un archivo para desencriptar...</Text>
          </TouchableOpacity>
        )}
        {encryptedFile && <FileItem file={encryptedFile} onRemove={handleRemoveFile} />}

        <TextInput
          style={styles.input}
          placeholder="Ingresa la contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button title="Seleccionar Ruta de Guardado" onPress={handleSelectDirectory} color={colorMap.secondary} />
        {directoryUri && <Text style={styles.directorySelected}>Directorio seleccionado: {directoryUri}</Text>}

        <Button title="Desencriptar" onPress={handleDecrypt} color={colorMap.secondary} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "white",
  },
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: typography.medium,
    color: colorMap.darkpurple,
  },
  filePickerContainer: {
    borderColor: colorMap.secondary,
    borderWidth: 2,
    borderStyle: 'dashed',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: colorMap.foreground
  },
  filePickerText: {
    color: colorMap.secondary,
    fontFamily: 'Rethink-Medium',
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    marginTop: 30,
    height: 40,
    borderColor: colorMap.secondary,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colorMap.foreground,
    width: '100%',
  },
  directorySelected: {
    marginVertical: 10,
    color: colorMap.secondary,
    fontFamily: typography.medium,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default DecryptScreen;
