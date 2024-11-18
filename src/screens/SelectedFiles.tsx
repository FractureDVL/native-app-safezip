import React from "react"
import { StyleSheet, View, Text, ScrollView } from "react-native"
import { useFileContext } from "../context/FileContext";
import FileItem from "../components/FileItem";
import NotFoundFiles from "../assets/empty-files"


export default function SelectedFiles() {
  const { files } = useFileContext();

  return (
    <ScrollView style={styles.main_container}>
      <View className=" rounded-xl pb-4 mt-4">
        {files.map((item, index) => {
          return (
            <FileItem key={index} file={item} />
          );
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: "white",
    paddingHorizontal: 16
  }
})