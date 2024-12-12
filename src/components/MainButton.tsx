import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { colorMap } from '../constants/Colors';
import { useFileContext } from '../context/FileContext';
import { typography } from '../constants/Typography';
import * as FileSystem from 'expo-file-system';
import { useLoading } from '../context/LoadingContext';
import { compressFiles } from '../utils/compressFiles';

export default function MainButton({ navigation }) {
  const { option, files, clearFiles, directoryUri, setDirectoryUri } = useFileContext();
  const { startLoading, stopLoading } = useLoading();

  const text = option === 'compress' ? 'Comprimir' : 'Proteger';
  const buttonColor = colorMap.other;
  const backgroundColor = files.length ? colorMap.secondary : colorMap.accent;

  const requestStoragePermission = async () => {
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        setDirectoryUri(permissions.directoryUri);
        return permissions.directoryUri;
      } else {
        console.log('Permiso denegado');
        return null;
      }
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
      return null;
    }
  };

  const handleOnPress = async () => {
    if (files.length > 0) {
      let uri = directoryUri;
      if (!uri) {
        uri = await requestStoragePermission();
      }
      if (uri) {
        startLoading();
        if (option === 'compress') {
          navigation.navigate('LoadingScreen');
          await compressFiles(files, uri, clearFiles);
        } else {
          navigation.navigate('PasswordScreen');
        }
        stopLoading();
      }
      console.log("ruta:", uri)
    } else {
      console.log('No hay archivos seleccionados.');
    }
  };

  return (
    <View>
      {option === 'compress' ? (
        <FontAwesome.Button
          name={'compress'}
          size={24}
          color={buttonColor}
          style={styles.button}
          onPress={handleOnPress}
          backgroundColor={backgroundColor}
        >
          <Text style={{ color: buttonColor, fontSize: 20, fontFamily: typography.semibold }}>{text}</Text>
        </FontAwesome.Button>
      ) : (
        <MaterialIcons.Button
          name={'lock-open'}
          size={24}
          color={buttonColor}
          backgroundColor={backgroundColor}
          style={styles.button}
          onPress={handleOnPress}
        >
          <Text style={{ color: buttonColor, fontSize: 20, fontFamily: typography.semibold }}>{text}</Text>
        </MaterialIcons.Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: 'center',
  },
});
