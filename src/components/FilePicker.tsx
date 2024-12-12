import { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import Feather from '@expo/vector-icons/Feather';
import { colorMap } from '../constants/Colors';
import { useFileContext } from '../context/FileContext';
import React from 'react';
import { useLoading } from '../context/LoadingContext';

interface FilePickerProps {
  className?: string;
  text? : string;
}

export default function FilePicker({ className = "", text="Presiona acá para agregar archivos..." }: FilePickerProps) {
  const { files, setFiles } = useFileContext();

  const pickDocuments = async () => {
    try {
      let result: DocumentPicker.DocumentPickerResult = await DocumentPicker.getDocumentAsync({
        multiple: true,
      });
      console.log(result.assets)
      if (!result.canceled && result.assets) {
        setFiles([...files, ...result.assets]);
      } else if (result.canceled) {
        console.log("Selección cancelada");
      }
    } catch (error) {
      console.error("Error al seleccionar archivos:", error);
    } finally {
    }
  };

  return (
    <View className={`w-full ${className}`}>
      <TouchableOpacity 
          className="border-secondary bg-foreground border-dashed border-2 py-8 px-12 rounded-[20px] text-center" 
          onPress={pickDocuments}>
        <Feather className="text-center mb-2" name="upload" size={30} color={colorMap.secondary} />
        <Text className="text-secondary text-center"
          style={{ fontFamily: "Rethink-Medium", fontSize: 18 }}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
