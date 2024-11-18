import React, { Fragment } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { colorMap } from '../constants/Colors';
import Button from './Button';
import { ArrowRightIcon } from '../constants/Icons';
import NotFoundFiles from '../assets/empty-files';
import { useFileContext } from '../context/FileContext';
import FileItem from './FileItem';

interface FileListProps {
  className?: string;
}



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
      <View>
          {files && files.length > 0 ? (
              <View className="bg-white rounded-xl px-4 py-6 mt-4 w-full">
                    {files.slice(0, 3).map((item, index) => {
                    return (
                      <FileItem key={index} file={item}/>
                    );
                  })}
                  {files.length > 3 && (
                    <Text className="text-lg font-semibold">...</Text>
                  )}
              </View>
          ) : (
            <View className="bg-white rounded-xl px-4 py-6 mt-4">
                {/* Empty state No files */}
                <View className="flex justify-center items-center m-auto">
                  <NotFoundFiles width={120} height={120} />
                  <Text className="mt-4 text-center" style={{ fontFamily: "Rethink-SemiBold", color: colorMap.secondary, fontSize: 14 }}>
                    Sin archivos aún
                  </Text>
                  <Text className="text-center" style={{ fontFamily: "Rethink-Regular", color: colorMap.secondary, fontSize: 14 }}>
                    ¡Agrega algunos para empezar!
                  </Text>
                </View>
              </View>
          )}
      </View>
    </View>
  );
}
