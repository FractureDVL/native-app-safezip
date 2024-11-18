import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { colorMap } from '../constants/Colors';
import NotFoundFiles from '../assets/empty-files';
import { useFileContext } from '../context/FileContext';
import FileItem from './FileItem';
import { typography } from '../constants/Typography';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

export default function FileList({ navigation }) {
  const { files } = useFileContext();

  const handleSeeAll = function (){
    if (files.length > 0) {
      navigation.navigate('Files');
    }
  }

  return (
    <View style={styles.main_container}>
      <View className="flex-row justify-between align-middle">
        {/* Component title*/}
        <Text style={{fontFamily: typography.semibold, fontSize: 20, color: colorMap.secondary}}>Tus Archivos</Text>
        {/* Show all list*/}
        <MaterialIcons.Button 
            name="navigate-next" 
            size={24} style={styles.button_all} 
            color={colorMap.secondary}
            onPress={handleSeeAll}
            >Ver todos</MaterialIcons.Button>
      </View>
      <View>
          {files && files.length > 0 ? (
              <View className=" rounded-xl pb-4 mt-4">
                    {files.slice(0, 3).map((item, index) => {
                    return (
                      <FileItem key={index} file={item}/>
                    );
                  })}
                  {files.length > 3 && (
                    <View className='items-center'>
                      <Entypo name="dots-three-horizontal"
                        size={16} 
                        color={colorMap.darkpurple} 
                        style={{backgroundColor: colorMap.foreground, paddingHorizontal:8, borderRadius:8}} />
                    </View>
                  )}
              </View>
          ) : (
            <View className="bg-white rounded-xl px-4 py-6 mt-4">
                {/* Empty state No files */}
                <View className="flex justify-center items-center m-auto">
                  <NotFoundFiles width={120} height={120} />
                  <Text className="mt-4 text-center" style={{ fontFamily: typography.semibold, fontSize: 14, color: colorMap.secondary }}>
                    Sin archivos aún
                  </Text>
                  <Text className="text-center" style={{ fontFamily: typography.semibold, fontSize: 14, color: colorMap.secondary  }}>
                    ¡Agrega algunos para empezar!
                  </Text>
                </View>
              </View>
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container:{
    marginTop: 20,
    minHeight: 350,
  },
  text_title: {
    flex: 1,
    margin: "auto"
  },
  button_all: {
    flexDirection: "row-reverse",
    backgroundColor: "#FFFFFFFF",
    borderColor: colorMap.secondary,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: "space-between"
  }
})