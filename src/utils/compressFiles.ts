import JSZip from 'jszip';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export const compressFiles = async (files: DocumentPicker.DocumentPickerAsset[], directoryUri: string | null, clearFiles: () => void) => {
  const zip = new JSZip();
  const timestamp = new Date().toISOString().replace(/[:.-]/g, '');

  for (const file of files) {
    // Leer el archivo en binario
    const fileData = await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convertir base64 a binario y agregarlo al ZIP
    const binaryData = Uint8Array.from(atob(fileData), c => c.charCodeAt(0));
    zip.file(file.name, binaryData, { base64: true });
  }

  // Generar el archivo ZIP
  const zipOptions: JSZip.JSZipGeneratorOptions<'arraybuffer'> = {
    type: 'arraybuffer',
    compression: 'DEFLATE',
    compressionOptions: {
      level: 9,
    },
  };

  const zipContent = await zip.generateAsync(zipOptions);
  const zipFileName = `compressed_${timestamp}.zip`;
  const zipUri = `${FileSystem.documentDirectory}${zipFileName}`;

  // Escribir el archivo ZIP en el sistema de archivos
  await FileSystem.writeAsStringAsync(zipUri, arrayBufferToBase64(zipContent), {
    encoding: FileSystem.EncodingType.Base64,
  });

  if (directoryUri) {
    try {
      const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
        directoryUri,
        zipFileName,
        'application/zip'
      );

      const zipContentBase64 = await FileSystem.readAsStringAsync(zipUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await FileSystem.writeAsStringAsync(fileUri, zipContentBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log('Archivo comprimido guardado en:', fileUri);
      clearFiles();
    } catch (error) {
      console.error('Error al guardar el archivo comprimido:', error);
    }
  } else {
    console.log('No se dieron los permisos.');
  }

  // Eliminar el archivo temporal
  await FileSystem.deleteAsync(zipUri);
};
