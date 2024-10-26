import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleProp, TextStyle, ViewStyle } from 'react-native';

interface ButtonProps {
  title?: string;
  className?: string;
  titleClass?: string;
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
}

export default function Button({
  title = "Button",
  className = "bg-black rounded-lg px-8 py-4",
  titleClass = "text-white",
  children,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity className={className}>
      {children}
      <Text className={titleClass} style={style}>{title}</Text>
    </TouchableOpacity>
  );
}
