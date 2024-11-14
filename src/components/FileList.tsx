import React, { Fragment } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { colorMap } from '../constants/Colors';
import Button from './Button';
import { ArrowRightIcon } from '../constants/Icons';
import NotFoundFiles from '../assets/empty-files';
import { useFileContext } from '../context/FileContext';
import { WordIcon, ExcelIcon, PdfIcon, VideoIcon , ImgIcon, AudioIcon } from '../constants/Icons';

interface FileListProps {
  className?: string;
}

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

export default function FileList({ className }: FileListProps) {
  const { files } = useFileContext();

  return (
    <View className={className}>
      <View className="flex-row justify-between align-middle">
        {/* Component title*/}
        <Text className="flex-1 m-auto" 
              style={{ fontFamily: "Rethink-SemiBold", fontSize: 20, color: colorMap.secondary }}>
          Tus Archivos
        </Text>
        {/* Show all list*/}
        <Button title="Ver todo" 
                iconPosition="right" 
                className="border-2 rounded-lg pl-4 pr-2 py-2 border-secondary" 
                style={{ fontFamily: "Rethink-SemiBold", color: colorMap.secondary, fontSize: 16 }}>
          <ArrowRightIcon style={{ color: colorMap.secondary }}/>
        </Button>
      </View>

      <ScrollView>
        <View className="bg-white rounded-xl px-4 py-6 mt-4 w-full">
          {files && files.length > 0 ? (
            <Fragment>
              {files.slice(0, 3).map((file, index) => {
                const fileName = file.name.replace(/\.\w+$/, ''); // File name without extension

                return (
                  <View key={index} className="p-2 border-b border-gray-300">
                    {/* Container for icon and file name */}
                    <View className="flex-row items-center space-x-6">
                      {/* File icon */}
                      {getFileIcon(file.name.split('.').pop())}
                      
                      {/* File name (truncated if too long) */}
                      <Text className="text-lg font-semibold truncate" style={{ marginLeft: 10, maxWidth: '80%' }}>
                        {fileName}
                      </Text>
                    </View>
                  </View>
                );
              })}
              
              {files.length > 3 && (
                <Text className="text-lg font-semibold">...</Text>
              )}
            </Fragment>
          ) : (
            <Fragment>
              {/* Empty state No files*/}
              <NotFoundFiles width={120} height={120} />
              <Text className="mt-4" style={{ fontFamily: "Rethink-SemiBold", color: colorMap.secondary, fontSize: 14 }}>
                Sin archivos aún
              </Text>
              <Text style={{ fontFamily: "Rethink-Regular", color: colorMap.secondary, fontSize: 14 }}>
                ¡Agrega algunos para empezar!
              </Text>
            </Fragment>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
