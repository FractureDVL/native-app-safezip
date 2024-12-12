import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import FilePicker from "../components/FilePicker";
import FileList from "../components/FileList";
import Navbar from "../components/Navbar";
import Separator from "../atoms/Separator";
import MainOptions from "../components/MainOptions";
import MainButton from "../components/MainButton";
import { useFileContext } from "../context/FileContext";
import { typography } from "../constants/Typography";
import { colorMap } from "../constants/Colors";

export default function Home({ navigation }) {
  const { option } = useFileContext();

  const onPressDecrypt = () =>{
    navigation.navigate('DecryptScreen')
    console.log("desencriptar")
  }

  return (
    <View style={styles.main_container}>
      <Navbar />
      <MainOptions />
      <FilePicker className="mt-8" />
      <View style={styles.decrypt_container}>
        {option === "protect" ? (
          <TouchableOpacity onPress={onPressDecrypt}>
            <Text style={styles.decrypt_text}>Desencriptar un archivo?</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.invisible_text}> </Text>
        )}
      </View>
      <FileList navigation={navigation} />
      <MainButton navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: "white",
    flex: 1,
  },
  decrypt_container: {
    marginTop: 16,
    alignItems: "center",
  },
  decrypt_text: {
    fontFamily: typography.medium,
    fontSize: 16,
    color: colorMap.secondary,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
  invisible_text: {
    fontSize: 16,
    color: "transparent",
    textDecorationLine: "none",
  },
});

