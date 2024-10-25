import React from "react";
import { CompressIcon, ProtectIcon } from "./Icons";
import { View, ScrollView } from "react-native";
import FilePicker from "../components/FilePicker"
import FileList from "../components/FileList"
import Navbar from "./Navbar";
import Button from "./Button"

export default function Main() {
  return (
    <View className="mt-12 mx-6">
        <ScrollView>
          <Navbar />
          {/* File picker input */}
          <FilePicker className="mt-6"/>
          {/* Options */}
          <View className="flex-row justify-between mt-6">
            {/* Compress option button */}
            <Button title="Comprimir"
              className="flex-col bg-primary px-8 py-4 justify-center rounded-xl flex-1 mr-2" 
              titleClass="text-foreground text-center" 
              style={{ fontFamily: "Rethink-SemiBold", fontSize: 16}}> 
              <CompressIcon className="text-center mb-3"/>
            </Button>
            {/* Encrypt option button */}
            <Button title="Proteger"
              className="flex-col bg-foreground px-8 py-4 justify-center rounded-xl flex-1 ml-2" 
              titleClass="text-primary text-center" 
              style={{ fontFamily: "Rethink-SemiBold", fontSize: 16}}> 
              <ProtectIcon className="text-center mb-3" color={"#433878"}/>
            </Button>
          </View>
          {/* List of selected files*/}
          <FileList className={"mt-6"} />
        </ScrollView>
    </View>
  );
}


  