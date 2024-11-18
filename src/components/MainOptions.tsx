import { Text, View, StyleSheet } from "react-native";
import { useFileContext } from "../context/FileContext";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { colorMap } from "../constants/Colors";
import { typography } from "../constants/Typography";
import React from "react";

export default function MainOptions() {
    const { option, handleOptionChange } = useFileContext();

    // Definir los estilos para los botones de manera condicional
    const compressButtonStyle = option === "compress"
        ? { backgroundColor: colorMap.secondary, color: colorMap.foreground }
        : { backgroundColor: colorMap.foreground, color: colorMap.secondary };

    const protectButtonStyle = option === "protect"
        ? { backgroundColor: colorMap.secondary, color: colorMap.foreground }
        : { backgroundColor: colorMap.foreground, color: colorMap.secondary };

    return (
        <View style={styles.main_container}>
            {/* Botón de Comprimir */}
            <View style={styles.container}>
                <FontAwesome.Button
                    name="compress"
                    size={24}
                    color={compressButtonStyle.color}
                    onPress={() => handleOptionChange("compress")}
                    backgroundColor={compressButtonStyle.backgroundColor}
                    style={styles.button}
                >
                    <Text style={{ color: compressButtonStyle.color, fontFamily: styles.text.fontFamily }}>Comprimir</Text>
                </FontAwesome.Button>
            </View>
            {/* Botón de Proteger */}
            <View style={styles.container}>
                <MaterialIcons.Button
                    name="lock-open"
                    size={24}
                    color={protectButtonStyle.color}
                    onPress={() => handleOptionChange("protect")}
                    backgroundColor={protectButtonStyle.backgroundColor}
                    style={styles.button}
                >
                    <Text style={{ color: protectButtonStyle.color, fontFamily: styles.text.fontFamily }}>Proteger</Text>
                </MaterialIcons.Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: "row",
        marginTop: 20,
    },
    container:{
        flex: 1
    },
    button: {
        flexDirection: "column",
        marginHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontFamily: typography.medium
    }
});
