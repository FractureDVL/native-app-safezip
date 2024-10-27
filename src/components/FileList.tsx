import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colorMap } from '../constants/Colors';
import Button from './Button';
import { ArrowRightIcon } from '../constants/Icons';
import NotFoundFiles from '../assets/empty-files.svg';

interface FileListProps {
  className?: string;
}

export default function FileList({ className }: FileListProps) {
  const showAll = () =>{

  }

  return (
    <View className={className}>
      <View className="flex-row justify-between align-middle">
        {/* Component title*/}
        <Text className="flex-1 m-auto" 
            style={{ fontFamily: "Rethink-SemiBold", fontSize: 20, color:colorMap.secondary }}>Tus Archivos</Text>
        {/* Show all list*/}
        <Button title="Ver todo" 
            iconPosition="right" 
            className="bg-white border-2 rounded-lg pl-4 pr-2 py-2 border-secondary" 
            style={{ fontFamily: "Rethink-SemiBold", color: colorMap.secondary, fontSize: 16 }}>
          <ArrowRightIcon style={{ color: colorMap.secondary }}/>
        </Button>
      </View>

      <View className="w-full justify-center items-center py-5">
        <NotFoundFiles width={150} height={150} />
        <Text className="mt-4"
         style={{ fontFamily: "Rethink-SemiBold", color: colorMap.secondary, fontSize: 18 }}>Sin archivos aún</Text>
        <Text className=""
        style={{ fontFamily: "Rethink-Regular", color: colorMap.secondary, fontSize: 16 }}>¡Agrega algunos para empezar!</Text>
      </View>
    </View>
  );
}
