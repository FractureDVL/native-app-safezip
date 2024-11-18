import { createContext, ReactNode, useContext, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import JSZip from 'jszip';
import * as FileSystem from 'expo-file-system';


interface FileContextType {
    files: DocumentPicker.DocumentPickerAsset[],
    setFiles: React.Dispatch<React.SetStateAction<DocumentPicker.DocumentPickerAsset[]>>,
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: ReactNode }) => {
    const [files, setFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);


    const useFileCompression = () => {
        const compressFiles = async (files) => {
            const zip = new JSZip();
    
            for (const file of files) {
                const fileData = await FileSystem.readAsStringAsync(file.uri, { encoding: FileSystem.EncodingType.Base64 });
                zip.file(file.name, fileData, { base64: true });
            }
    
            const zipContent = await zip.generateAsync({ type: 'blob' });
            return zipContent; 
        };
    
        return { compressFiles };
    };
    
    const value = {
        files,
        setFiles,
        useFileCompression
    };

    return (
        <FileContext.Provider value={value}>
            {children}
        </FileContext.Provider>
    );
};

export const useFileContext = () => useContext(FileContext);
