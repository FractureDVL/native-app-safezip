import { View, Text } from 'react-native';
import React from 'react';
import { WordIcon, ExcelIcon, PdfIcon, VideoIcon, ImgIcon, AudioIcon } from '../constants/Icons';
import { colorMap } from '../constants/Colors';
import { Badge } from '../atoms/Badge';

const getFileIcon = (extension: string) => {
  switch (extension) {
    case 'docx':
    case 'doc':
      return <WordIcon color="#433878" />;
    case 'xlsx':
    case 'xls':
      return <ExcelIcon color="#433878" />;
    case 'pdf':
      return <PdfIcon color="#433878" />;
    case 'mp4':
    case 'avi':
      return <VideoIcon color="#433878" />;
    case 'jpeg':
    case 'jpg':
    case 'png':
    case 'gif':
    case 'svg':
      return <ImgIcon color="#433878" />;
    case 'mp3':
      return <AudioIcon color="#433878" />;
    default:
      return null;
  }
};

interface FileItemProps {
  className?: string;
  file: any;
}

export default function FileItem({ file }: FileItemProps) {
  const filename = file.name.replace(/\.\w+$/, '');
  const extension = file.name.split('.').pop()?.toUpperCase() || '';

  return (
    <>
      {/* Contenedor para ícono y nombre del archivo */}
      <View className="flex-row bg-foreground p-4 rounded-lg mb-2">
        {/* Ícono del archivo */}
        <View className="p-2 bg-background rounded-lg">
          <View className="p-2 bg-accent rounded-lg">
            {getFileIcon(extension.toLowerCase())}
          </View>
        </View>
        {/* Nombre del archivo (truncado si es muy largo) */}
        <View className="flex-1 pl-4 justify-between">
          <Text
            className=" font-semibold truncate text-start"
            style={{
              fontFamily: 'Rethink-SemiBold',
              color: colorMap.darkpurple,
            }}
          >
            {filename}
          </Text>
          {/* Pasar la extensión al Badge */}
          <Badge text={extension} />
        </View>
      </View>
    </>
  );
}
