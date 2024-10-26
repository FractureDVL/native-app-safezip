import { View, Text } from 'react-native';
import React from 'react';

interface FileItemProps {
    className? : String
}

export default function FileItem ({}: FileItemProps) {
    return(
        <View>
            <Text>Este componente representa un item de la lista de archivos seleccionados.</Text>
        </View>
    )
}