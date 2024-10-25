import { View, Text} from "react-native";

export default function FileList ({className}) {
    return(
        <View className={`${className}`}>
            <Text style={{fontFamily: "Rethink-SemiBold", fontSize: 20}}>Tus Archivos</Text>
        </View>
    );
}