import { View , Text, StyleSheet} from "react-native"
import { colorMap } from "../constants/Colors";
import { typography } from "../constants/Typography";

interface BadgeProps {
    text : string
}

export function Badge ({ text="PDF" } : BadgeProps){
    return(
        <View className="rounded-md px-2 py-1" style={ badgeStyles.container }>
            <Text style={textStyles.text}>
                {text}           
            </Text>
        </View>
    )
}

const textStyles = StyleSheet.create({
    text: {
        color: colorMap.other,
        fontFamily: typography.medium,
        fontSize: 12
    }
})

const badgeStyles = StyleSheet.create({
    container: {
      backgroundColor: colorMap.darkpurple,
      alignSelf: "flex-start", 
      flexShrink: 1,
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: 4
    }
  });