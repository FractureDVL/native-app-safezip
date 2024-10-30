import { createContext, ReactNode, useContext, useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';

interface FileContextType {
    files: DocumentPicker.DocumentPickerAsset[],
    setFiles: React.Dispatch<React.SetStateAction<DocumentPicker.DocumentPickerAsset[]>>,
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: ReactNode }) => {
    const [files, setFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);

    const value = {
        files,
        setFiles
    };

    return (
        <FileContext.Provider value={value}>
            {children}
        </FileContext.Provider>
    );
};

export const useFileContext = () => useContext(FileContext);
