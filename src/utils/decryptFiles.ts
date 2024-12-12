import * as FileSystem from 'expo-file-system';
import CryptoJS from 'crypto-js';

export const decryptFile = async (encryptedFileUri, password, directoryUri) => {
  try {
    const encryptedData = await FileSystem.readAsStringAsync(encryptedFileUri, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, password);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

    if (!decryptedData) {
      throw new Error("Contraseña incorrecta");
    }

    // Obtener la extensión del archivo original desde el nombre del archivo encriptado
    const originalFileName = encryptedFileUri.split('/').pop();
    const originalExtension = originalFileName.split('_').pop().split('.').slice(0, -1).join('.');

    const decryptedFileName = `decrypted_${new Date().getTime()}.${originalExtension}`;
    const decryptedFileUri = `${FileSystem.documentDirectory}${decryptedFileName}`;

    // Guardar el archivo desencriptado en el almacenamiento interno de la aplicación primero
    await FileSystem.writeAsStringAsync(decryptedFileUri, decryptedData, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Mover el archivo desencriptado al almacenamiento externo
    const externalDecryptedFileUri = await FileSystem.StorageAccessFramework.createFileAsync(
      directoryUri,
      decryptedFileName,
      `application/${originalExtension}`
    );
    const fileData = await FileSystem.readAsStringAsync(decryptedFileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    await FileSystem.writeAsStringAsync(externalDecryptedFileUri, fileData, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileInfo = await FileSystem.getInfoAsync(externalDecryptedFileUri);
    if (fileInfo.exists) {
      console.log('El archivo desencriptado se ha guardado correctamente en el almacenamiento externo:', externalDecryptedFileUri);
    } else {
      console.log('Error: El archivo desencriptado no se ha guardado en el almacenamiento externo.');
    }

    return externalDecryptedFileUri;
  } catch (error) {
    console.error('Error al desencriptar el archivo:', error);
    throw error;
  }
};
