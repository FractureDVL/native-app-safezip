import { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Feather from '@expo/vector-icons/Feather';
import { colorMap } from '../constants/Colors';

interface FilePickerProps {
  className?: string;
}

export default function FilePicker({ className = "" }: FilePickerProps) {
  const [files, setFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);

  const pickDocuments = async () => {
    let result: DocumentPicker.DocumentPickerResult = await DocumentPicker.getDocumentAsync({
      multiple: true,
    });

    if (!result.canceled && result.assets) {
      setFiles(prevFiles => [...prevFiles, ...result.assets]);
    } else if (result.canceled) {
      console.log('Selección cancelada'); 
    }
  };

  const getFileType = (file: DocumentPicker.DocumentPickerAsset) => {
    const { mimeType } = file;
    return mimeType ? mimeType : 'Tipo desconocido';
  };

  return (
    <View className={`w-full ${className}`}>
      <TouchableOpacity 
          className="border-secondary bg-foreground border-dashed border-2 py-8 px-12 rounded-[20px] text-center" 
          onPress={pickDocuments}>
        <Feather className="text-center mb-2" name="upload" size={30} color={colorMap.secondary} />
        <Text className="text-secondary text-center"
          style={{ fontFamily: "Rethink-Medium", fontSize: 18 }}
        >
          Presiona acá para agregar archivos ...
        </Text>
      </TouchableOpacity>
      
      {/* <ScrollView className="border-t border-gray-300">
        {files.map((file, index) => (
          <View key={index} className="p-2 border-b border-gray-300">
            <Text className="text-lg font-semibold">Archivo seleccionado: {file.name}</Text>
            <Text className="text-gray-600">Tipo de archivo: {getFileType(file)}</Text>
          </View>
        ))}
      </ScrollView> */}
    </View>
  );
}
