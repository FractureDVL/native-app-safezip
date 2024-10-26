import React from 'react';
import { Text, View } from 'react-native';
import { es } from "date-fns/locale";
import { format } from "date-fns";
import _ from 'lodash';

interface NavbarProps {
    className? : String
}

export default function Navbar ({className}: NavbarProps){
    const today : String = format(new Date(),"d MMMM\, yyyy", {locale: es}); 

    return (
        <View className={`${className}`}>
            <Text
                style={{ fontFamily: "Rethink-SemiBold", fontSize: 24 }} 
                className={"color-primary font"}>Hola 👋</Text>
            <Text 
                style={{ fontFamily: "Rethink-SemiBold", fontSize: 16 }} 
                className={"color-primary font"}>{_.startCase(_.toLower(today))}</Text>
        </View>
    );
};
