import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import tw from "twrnc";
import { Fonts, Typography } from "@/constants/typography";
import Text from "../ui/Text";

type Props = {
  question: string;
};

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

  const renderImagePreview = () => {
    if (image) {
      return <Image source={{ uri: image }} style={styles.imagePreview} />;
    }
    return null;
  };

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text style={{
        fontFamily: Fonts.Inter_600SemiBold,
        color: Colors.design.highContrastText,
        fontSize: Typography.buttonText,
        marginBottom: 8

      }}>{props.question}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={pickImage}
        style={[tw`border-dashed border-zinc-400/30 gap-4 flex-col items-center`, {
          borderColor: Colors.light.primary,
          backgroundColor: Colors.design.white,
          borderRadius: 16,
          padding: 2,
          borderWidth: 2
        }]}
      >
        {!image && <View style={{ padding: 16, flexDirection: "column", gap: 8 }}>
          <View style={tw`bg-white p-4 rounded-full `}>
            <Feather name="image" size={24} color={Colors.design.accent} />
          </View>
          <Text style={[tw`font-bold text-zinc-950`, {
            fontSize: Typography.buttonText
          }]}>Upload Image</Text>
          <Text style={[tw`text-center`,]}>
            Please click this big button to upload an image from your gallery or
            to take a picture using your camera
          </Text>
        </View>}
        {image && renderImagePreview()}

      </TouchableOpacity>
    </View>
  );
};

export default FilePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 300,
    borderRadius: 16,
  }
});
