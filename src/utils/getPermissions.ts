import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

export const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        console.log('Permiso concedido');
        return true;
      } else {
        console.log('Permiso denegado');
        return false;
      }
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
      return false;
    }
  } else {
    console.log('Esta funcionalidad solo está disponible en Android.');
    return false;
  }
};
