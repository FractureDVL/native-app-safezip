import React from "react";
import { Image, Text, StatusBar, StyleSheet, View, ScrollView } from "react-native";
import Constants from 'expo-constants';
import FilePicker from "../components/FilePicker"
import FileList from "../components/FileList"
const icon = require("../assets/icon.png");

export default function Main() {
  return (
    <View style={styles.container}>
        <ScrollView>
          <StatusBar />
          <FilePicker />
          <FileList />
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      paddingTop: Constants.statusBarHeight,
      padding: 12
    },
    image: {
        marginBottom: 30,
        width: 100,
        height: 100
    }
  });
  