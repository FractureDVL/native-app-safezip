import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, View, StyleProp, TextStyle, ViewStyle } from 'react-native';

interface ButtonProps {
  title?: string;
  className?: string;
  titleClass?: string;
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
  iconPosition?: "left" | "right" | "top" | "bottom";
}

export default function Button({
  title = "Button",
  className = "bg-black rounded-lg px-8 py-4",
  titleClass = "text-white",
  children,
  style,
  iconPosition = "left",
}: ButtonProps) {
  
  const containerStyle: StyleProp<ViewStyle> = {
    flexDirection: iconPosition === "left" || iconPosition === "right" ? "row" : "column",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <TouchableOpacity className={className} style={{ flexDirection: containerStyle.flexDirection }}>
      {iconPosition === "left" || iconPosition === "top" ? children : null}
      <Text className={titleClass} style={style}>{title}</Text>
      {iconPosition === "right" || iconPosition === "bottom" ? children : null}
    </TouchableOpacity>
  );
}
