import { Text, View } from 'react-native';
import React from 'react';

export default function Navbar (){
    const userName = "Andrés";

    return(
        <View>
            <Text style={{ fontFamily: "Rethink-SemiBold", fontSize: 24 }} 
                className={"color-primary font"}>Hola, {userName} 👋</Text>
            <Text style={{ fontFamily: "Rethink-SemiBold", fontSize: 16 }} 
                className={"color-primary font"}>24 Nov, 2024</Text>
        </View>
    );
};