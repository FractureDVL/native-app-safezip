import { View, Text } from 'react-native';
import React from 'react';
import { WordIcon, ExcelIcon, PdfIcon, VideoIcon , ImgIcon, AudioIcon } from '../constants/Icons';
import { colorMap } from '../constants/Colors';


const getFileIcon = (extension: string) => {
    switch (extension) {
      case 'docx':
      case 'doc':
        return <WordIcon color="#BA9BFC" />; 
      case 'xlsx':
      case 'xls':
        return <ExcelIcon color="#BA9BFC" />;
      case 'pdf':
        return <PdfIcon color="#BA9BFC" />;
      case 'mp4':
      case 'avi':
        return <VideoIcon color="#BA9BFC" />;
      case 'jpeg':
      case 'jpg':
      case 'png':
      case 'gif':
      case 'svg':
        return <ImgIcon color="#BA9BFC" />;
      case 'mp4':
      case 'avi':
      case 'mp3':
        return <AudioIcon color="#BA9BFC" />;
    }
  };

interface FileItemProps {
    className? : String,
    file: any
}

export default function FileItem ({file}: FileItemProps) {

    const filename = file.name.replace(/\.\w+$/, '');

    return(
      <>
        {/* Container for icon and file name */}
        <View className="flex-row items-center space-x-6 bg-foreground p-4 rounded-lg">
        {/* File icon */}
        <View className="p-2 bg-accent rounded-lg">
          <View className='p-2 bg-primary rounded-lg'>
            {getFileIcon(file.name.split('.').pop())}
          </View>
        </View>
        {/* File name (truncated if too long) */}
        <Text className="text-lg font-semibold truncate" style={{ marginLeft: 10, maxWidth: '80%', fontFamily: "Rethink-SemiBold",  color: colorMap.primary }}>
          {filename}
        </Text>
      </View>
      </>
    )
}