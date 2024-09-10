import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { Fonts, Typography } from "@/constants/typography";
import Text from "../ui/Text";

type Props = {
  question: string;
  value: string | null;
  onChange: (value: string) => void;
};

const FilePicker = ({ question, value, onChange }: Props) => {
  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access the camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };

  const renderImagePreview = () => {
    if (value) {
      return <Image source={{ uri: value }} style={styles.imagePreview} />;
    }
    return null;
  };

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text style={{
        fontFamily: Fonts.Inter_600SemiBold,
        color: Colors.design.highContrastText,
        fontSize: Typography.body,
        marginBottom: 8
      }}>{question}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={pickImage}
        style={{
          borderColor: Colors.design.accent,
          backgroundColor: Colors.design.white,
          borderRadius: 16,
          padding: 16,
          borderWidth: 2,
          borderStyle: 'dashed',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!value && (
          <View style={{ alignItems: 'center' }}>
            <Feather name="image" size={24} color={Colors.design.accent} />
            <Text style={{
              fontSize: Typography.body,
              fontFamily: Fonts.Inter_700Bold,
              color: Colors.design.highContrastText,
              marginTop: 8,
            }}>
              Upload Image
            </Text>
            <Text style={{
              textAlign: 'center',
              marginTop: 4,
              color: Colors.design.text,
            }}>
              Click to upload an image from your gallery or take a picture
            </Text>
          </View>
        )}
        {renderImagePreview()}
      </TouchableOpacity>
    </View>
  );
};

export default FilePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  }
});
