import React from 'react';
import { View, Text } from 'react-native';

interface FileListProps {
  className?: string;
}

export default function FileList({ className }: FileListProps) {
  return (
    <View className={className}>
      <Text style={{ fontFamily: "Rethink-SemiBold", fontSize: 20 }}>Tus Archivos</Text>
    </View>
  );
}
