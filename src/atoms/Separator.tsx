import React from 'react';
import {View} from 'react-native';

interface SeparatorProps {
    className? : string
}

export default function Separator ({ className }: SeparatorProps ) {
    return(
        <View className={`h-2 bg-accent rounded-full ${className}`}/>
    );
};