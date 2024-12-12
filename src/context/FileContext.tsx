import { createContext, ReactNode, useContext, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import React from 'react';

interface FileContextType {
  files: DocumentPicker.DocumentPickerAsset[];
  setFiles: React.Dispatch<React.SetStateAction<DocumentPicker.DocumentPickerAsset[]>>;
  option: "compress" | "protect";
  setOption: React.Dispatch<React.SetStateAction<"compress" | "protect">>;
  directoryUri: string | null;
  setDirectoryUri: React.Dispatch<React.SetStateAction<string | null>>;
  handleOptionChange: (newOption: "compress" | "protect") => void;
  removeFile: (uri: string) => void;
  clearFiles: () => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [option, setOption] = useState<"compress" | "protect">("compress");
  const [files, setFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);
  const [directoryUri, setDirectoryUri] = useState<string | null>(null);

  // Función para cambiar la opción (comprimir o proteger)
  const handleOptionChange = (newOption: "compress" | "protect") => {
    setOption(newOption);
    if(files){
      setFiles([])
    }
  };

  const clearFiles = () => {
    setFiles([]);
  };

  // Función para eliminar un archivo por su URI
  const removeFile = (uri: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.uri !== uri));
  };

  const value = {
    files,
    setFiles,
    option,
    setOption,
    directoryUri,
    setDirectoryUri,
    handleOptionChange,
    removeFile,
    clearFiles
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
