import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function FilePicker() {
  const [files, setFiles] = React.useState<DocumentPicker.DocumentPickerAsset[]>([]);

  const pickDocuments = async () => {
    let result: DocumentPicker.DocumentPickerResult = await DocumentPicker.getDocumentAsync({
      multiple: true,
    });

    if (!result.canceled && result.assets) {
      setFiles([...files, ...result.assets]);
    } 
    else if (result.canceled) {
      console.log('Selección cancelada'); 
    }
  };

  const getFileType = (file: DocumentPicker.DocumentPickerAsset) => {
    const { mimeType } = file;
    return mimeType ? mimeType : 'Tipo desconocido';
  };

  return (
    <View>
      <TouchableOpacity className="border-primary bg-foreground bg-black" onPress={pickDocuments}>
        <Text className="text-primary text-lg font-bold">Seleccionar archivos</Text>
      </TouchableOpacity>
      <ScrollView className="border-t border-gray-300">
        {files.map((file, index) => (
          <View key={index} className="p-2 border-b border-gray-300">
            <Text className="text-lg font-semibold">Archivo seleccionado: {file.name}</Text>
            <Text className="text-gray-600">Tipo de archivo: {getFileType(file)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
