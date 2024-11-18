import React from 'react';
import { Text, StyleSheet} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';  
import { colorMap } from '../constants/Colors';
import { useFileContext } from '../context/FileContext';
import { typography } from '../constants/Typography';

export default function MainButton() {
    const { option , files, compressFiles} = useFileContext();
  
    const text = option === "compress" ? "Comprimir" : "Proteger";
    const buttonColor = colorMap.other;
    const backgroundColor = files.length ? colorMap.secondary : colorMap.accent 

    const handleOnPress = () => {
        compressFiles(files);
    }

    return (
        < >
            {option === "compress" ? (
                <FontAwesome.Button
                    name={"compress"}
                    size={24}
                    color={buttonColor}
                    backgroundColor={backgroundColor}
                    style={styles.button}
                    onPress={handleOnPress}
                >
                    <Text style={{ color: buttonColor, fontSize:20, fontFamily: typography.semibold  }}>{text}</Text>
                </FontAwesome.Button>
            ) : (
                <MaterialIcons.Button
                    name={"lock-open"}
                    size={24}
                    color={buttonColor}
                    backgroundColor={backgroundColor}
                    style={styles.button}
                    onPress={handleOnPress}
                >
                    <Text style={{ color: buttonColor, fontSize:20,  fontFamily: typography.semibold  }}>{text}</Text>
                </MaterialIcons.Button>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        justifyContent: 'center',
    },
});
