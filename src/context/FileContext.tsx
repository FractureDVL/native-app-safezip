import { createContext, ReactNode, useContext, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import JSZip from 'jszip';
import React from 'react'
import * as FileSystem from 'expo-file-system';

interface FileContextType {
  files: DocumentPicker.DocumentPickerAsset[];
  setFiles: React.Dispatch<React.SetStateAction<DocumentPicker.DocumentPickerAsset[]>>;
  option: "compress" | "protect";
  setOption: React.Dispatch<React.SetStateAction<"compress" | "protect">>;
  compressFiles: (files: DocumentPicker.DocumentPickerAsset[]) => Promise<Blob>;
  handleOptionChange: (newOption: "compress" | "protect") => void; 
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [option, setOption] = useState<"compress" | "protect">("compress");
  const [files, setFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);

  // Función de compresión de archivos
  const compressFiles = async (files: DocumentPicker.DocumentPickerAsset[]) => {
    const zip = new JSZip();
    for (const file of files) {
      const fileData = await FileSystem.readAsStringAsync(file.uri, { encoding: FileSystem.EncodingType.Base64 });
      zip.file(file.name, fileData, { base64: true });
    }
    const zipContent = await zip.generateAsync({ type: 'blob' });
    return zipContent;
  };
  
  //Funcion para cambiar la funcion (comprimir o proteger)
  const handleOptionChange = (newOption: "compress" | "protect") => {
    setOption(newOption);
  };

  const value = {
    files,
    setFiles,
    compressFiles,
    option,
    setOption,
    handleOptionChange
  };

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};
