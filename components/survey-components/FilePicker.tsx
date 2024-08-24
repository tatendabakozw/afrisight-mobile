import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import tw from "twrnc";

type Props = {};

const FilePicker = (props: Props) => {
  const [image, setImage] = useState<any>(null);

  const pickImage = async () => {
    // Request media library permissions
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access the camera roll is required!");
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update state with selected image URI
    }
  };
  return (
    <View style={tw`flex flex-col gap-2`}>
      <Text style={tw`text-zinc-700`}>Click Box Below to upload image</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={pickImage}
        style={tw`border-2 border-dashed border-[${Colors.light.primary}] gap-4 bg-[${Colors.light.primary}]/10 rounded-xl p-8 flex-col items-center`}
      >
        <View style={tw`bg-white p-4 rounded-full `}>
          <Feather name="upload" size={28} color={Colors.light.primary} />
        </View>
        <Text style={tw`text-3xl font-bold text-zinc-950`}>Upload Image</Text>
        <Text style={tw`text-lg text-center text-zinc-700`}>
          Please click this big button to upload an image from your gallery or
          to take a picture using your camera
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilePicker;

const styles = StyleSheet.create({});
