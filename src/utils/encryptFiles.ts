import * as FileSystem from 'expo-file-system';
import CryptoJS from 'crypto-js';

export const encryptFile = async (fileUri, password, directoryUri) => {
  try {
    const fileData = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const fileName = fileUri.split('/').pop();
    const fileExtension = fileName.split('.').pop();
    const encryptedFileName = `encrypted_${new Date().getTime()}_${fileExtension}.enc`;
    const encryptedFileUri = `${FileSystem.documentDirectory}${encryptedFileName}`;

    const encryptedData = CryptoJS.AES.encrypt(fileData, password).toString();

    // Guardar el archivo encriptado en el almacenamiento interno de la aplicación
    await FileSystem.writeAsStringAsync(encryptedFileUri, encryptedData, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const fileInfo = await FileSystem.getInfoAsync(encryptedFileUri);
    if (fileInfo.exists) {
      console.log('El archivo encriptado se ha guardado correctamente en:', encryptedFileUri);
    } else {
      console.log('Error: El archivo encriptado no se ha guardado.');
      return;
    }

    // Mover el archivo encriptado al almacenamiento externo
    const externalEncryptedFileUri = await FileSystem.StorageAccessFramework.createFileAsync(
      directoryUri,
      encryptedFileName,
      'application/octet-stream'
    );
    const fileDataExternal = await FileSystem.readAsStringAsync(encryptedFileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    await FileSystem.writeAsStringAsync(externalEncryptedFileUri, fileDataExternal, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const externalFileInfo = await FileSystem.getInfoAsync(externalEncryptedFileUri);
    if (externalFileInfo.exists) {
      console.log('El archivo encriptado se ha guardado correctamente en el almacenamiento externo:', externalEncryptedFileUri);
    } else {
      console.log('Error: El archivo encriptado no se ha guardado en el almacenamiento externo.');
    }

    return externalEncryptedFileUri;
  } catch (error) {
    console.error('Error al encriptar el archivo:', error);
    throw error;
  }
};
