import React from 'react';
import { Text, View } from 'react-native';
import { es } from "date-fns/locale";
import { format } from "date-fns";
import _ from 'lodash';

interface NavbarProps {
    className? : String
}

export default function Navbar ({className}: NavbarProps){
    const today : Date = new Date();
    const dateFormatted: String = format(today,"d MMMM\, yyyy", {locale: es});

    const grettings = () => {
        const hours = today.getHours();
        let message: String;

        if (hours >= 6 && hours < 12) {
            message = "Buenos días ☀️";
        } else if (hours >= 12 && hours < 18) {
            message = "Buenas tardes 🌤️";
        } else {
            message = "Buenas noches 🌙";
        }
        return message;
    };

    return (
        <View className={`${className}`}>
            <Text
                style={{ fontFamily: "Rethink-SemiBold", fontSize: 24 }} 
                className={"color-secondary font"}>{grettings()}</Text>
            <Text 
                style={{ fontFamily: "Rethink-SemiBold", fontSize: 16 }} 
                className={"color-secondary font"}>{_.startCase(_.toLower(dateFormatted))}</Text>
        </View>
    );
};
