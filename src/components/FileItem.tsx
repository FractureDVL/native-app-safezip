import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { WordIcon, ExcelIcon, PdfIcon, VideoIcon, ImgIcon, AudioIcon, FileIcon } from '../constants/Icons';
import { colorMap } from '../constants/Colors';
import { Badge } from '../atoms/Badge';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFileContext } from '../context/FileContext';

const getFileIcon = (extension: string) => {
  const iconColor = colorMap.secondary
  switch (extension) {
    case 'docx':
    case 'doc':
      return <WordIcon color={iconColor} />;
    case 'xlsx':
    case 'xls':
      return <ExcelIcon color={iconColor}  />;
    case 'pdf':
      return <PdfIcon color={iconColor}  />;
    case 'mp4':
    case 'avi':
      return <VideoIcon color={iconColor}  />;
    case 'jpeg':
    case 'jpg':
    case 'png':
    case 'gif':
    case 'svg':
      return <ImgIcon color={iconColor}  />;
    case 'mp3':
      return <AudioIcon color={iconColor}  />;
    default:
      return <FileIcon color={iconColor} />;
  }
};

interface FileItemProps {
  className?: string;
  file: any;
  onRemove?: (fileUri: string) => void;
}

export default function FileItem({ file, onRemove }: FileItemProps) {
  const { removeFile } = useFileContext();
  const filename = file.name.replace(/\.\w+$/, '');
  const extension = file.name.split('.').pop()?.toUpperCase() || '';

  const handleRemove = () => {
    if (onRemove) {
      onRemove(file.uri);
    } else {
      removeFile(file.uri);
    }
  };

  return (
    <View className="flex-row bg-foreground p-2 rounded-lg mb-2">
      {/* Ícono del archivo */}
      <View className="p-2 bg-background rounded-lg">
        <View className="p-2 bg-accent rounded-lg">
          {getFileIcon(extension.toLowerCase())}
        </View>
      </View>
      {/* Detalles del archivo */}
      <View className="flex-1 pl-4">
        <View className="justify-between py-2" style={styles.container}>
          <Text
            className="font-semibold truncate text-start"
            style={{
              fontFamily: 'Rethink-SemiBold',
              color: colorMap.darkpurple,
            }}
          >
            {filename}
          </Text>
          {/* Botón de eliminar */}
          <TouchableOpacity onPress={handleRemove}>
            <MaterialIcons name="delete" size={24} color={colorMap.secondary} />
          </TouchableOpacity>
        </View>
        {/* Badge para la extensión */}
        <Badge text={extension} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
