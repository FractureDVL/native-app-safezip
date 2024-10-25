import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';


export default function Button({ title="Button", className="bg-black rounded-lg px-8 py-4", titleClass="text-white", children, style={}}) {
  return (
    <TouchableOpacity className={className}>
      {children}
      <Text className={titleClass} style={style}>{title}</Text>
    </TouchableOpacity>
  );
}
