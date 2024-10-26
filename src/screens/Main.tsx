import React from "react";
import { CompressIcon, ProtectIcon } from "../constants/Icons";
import { View, ScrollView } from "react-native";
import FilePicker from "../components/FilePicker"
import FileList from "../components/FileList"
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Separator from "../components/Separator"
import { colorMap } from "../constants/Colors";

export default function Main() {
  return (
    <View className="mt-12 mx-6">
        <ScrollView>
          {/* Greetings message*/}
          <Navbar />
          {/* Separator Line*/}
          <Separator className="mt-8" />
          {/* File picker input */}
          <FilePicker className="mt-8"/>
          {/* Options */}
          <View className="flex-row justify-between mt-8">
            {/* Compress option button */}
            <Button title="Comprimir"
              className="flex-col bg-primary px-8 py-4 justify-center rounded-xl flex-1 mr-2" 
              titleClass="text-foreground text-center" 
              style={{ fontFamily: "Rethink-SemiBold", fontSize: 16}}> 
              <CompressIcon className="text-center mb-3" color={colorMap.foreground}/>
            </Button>
            {/* Encrypt option button */}
            <Button title="Proteger"
              className="flex-col bg-foreground px-8 py-4 justify-center rounded-xl flex-1 ml-2" 
              titleClass="text-center" 
              style={{ fontFamily: "Rethink-SemiBold", fontSize: 16}}> 
              <ProtectIcon className="text-center mb-3" color={colorMap.primary}/>
            </Button>
          </View>
          {/* List of selected files*/}
          <FileList className={"mt-6"} />
        </ScrollView>
    </View>
  );
}