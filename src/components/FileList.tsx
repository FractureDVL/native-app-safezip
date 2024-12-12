import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colorMap } from '../constants/Colors';
import { useFileContext } from '../context/FileContext';
import FileItem from './FileItem';
import { typography } from '../constants/Typography';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { FontAwesome6 } from '@expo/vector-icons';

export default function FileList({ navigation }) {
  const { files } = useFileContext();
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => { setIsButtonActive(files && files.length > 0); }, [files]);

  const handleSeeAll = function () {
    if (files.length > 0) {
      navigation.navigate('Files');
    }
  }

  return (
    <View style={styles.main_container}>
      <View style={styles.header}>
        {/* Component title */}
        <Text style={styles.title}>Tus Archivos</Text>
        {/* Show all list */}
        <TouchableOpacity
          onPress={handleSeeAll}
          style={[styles.button_all, { opacity: isButtonActive ? 1 : 0.5 }]}>
          <Text style={styles.button_text}>Ver todos</Text>
          <MaterialIcons name="navigate-next" size={24} color={colorMap.secondary} />
        </TouchableOpacity>
      </View>
      <View style={files && files.length > 0 ? styles.list_container_with_files : styles.list_container_without_files}>
        {files && files.length > 0 ? (
          <View>
            {files.slice(0, 3).map((item, index) => (
              <FileItem key={index} file={item} />
            ))}
            {files.length > 3 && (
              <View style={styles.more_files}>
                <Entypo
                  name="dots-three-horizontal"
                  size={16}
                  color={colorMap.darkpurple}
                  style={styles.dots}
                />
              </View>
            )}
          </View>
        ) : (
          <View style={styles.empty_state}>
            {/* Empty state No files */}
            <View style={styles.empty_content}>
              <FontAwesome6 name="file-circle-plus" size={36} color={colorMap.secondary} />
              <Text style={styles.empty_title}>
                Sin archivos aún
              </Text>
              <Text style={styles.empty_text}>
                ¡Selecciona algunos para empezar!
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    marginTop: 20,
    minHeight: 350,
    backgroundColor: "white"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.semibold,
    fontSize: 20,
    color: colorMap.secondary,
  },
  button_all: {
    flexDirection: 'row',
    borderColor: colorMap.secondary,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 8,
    paddingVertical: 4,
  },
  button_text: {
    fontFamily: typography.medium,
    color: colorMap.secondary,
  },
  list_container_with_files: {
    paddingTop: 20
  },
  list_container_without_files: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  more_files: {
    alignItems: 'center',
  },
  dots: {
    backgroundColor: colorMap.foreground,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  empty_state: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  empty_content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty_title: {
    marginTop: 20,
    textAlign: 'center',
    fontFamily: typography.semibold,
    fontSize: 18,
    color: colorMap.secondary,
  },
  empty_text: {
    textAlign: 'center',
    fontFamily: typography.semibold,
    fontSize: 16,
    color: colorMap.secondary,
  },
});
