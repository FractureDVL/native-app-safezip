import React from "react";
import { View, StyleSheet} from "react-native";
import FilePicker from "../components/FilePicker";
import FileList from "../components/FileList";
import Navbar from "../components/Navbar";
import Separator from "../atoms/Separator";
import MainOptions from "../components/MainOptions";
import MainButton from "../components/MainButton";


export default function Home({navigation}) {
  return (
    <View style={style.main_container}>
      <Navbar />
      <Separator className="mt-8"/>
      <MainOptions/>
      <FilePicker className="mt-8" />
      <FileList navigation={navigation}/>
      <MainButton/>
    </View>
  );
}

const style = StyleSheet.create({
    main_container: {
      paddingTop: 64,
      paddingHorizontal: 16,
      backgroundColor: "white"
    }
})


