import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import PrimaryButton from "../buttons/PrimaryButton";
import { Link, useNavigation } from "expo-router";

interface Props {
  modalVisible: boolean;
  setModalVisible?: any;
}

const ResetPasswordSuccess = ({ modalVisible, setModalVisible }: Props) => {
  const navigation = useNavigation();
  const backToSignIn = () => {
    setModalVisible(false);
    // @ts-ignore
    navigation.navigate("index");
  };
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={[tw`h-full w-full`, styles.container]}>
        <BlurView
          tint="systemUltraThinMaterialDark"
          intensity={100}
          style={[tw`items-center justify-center gap-4 px-16`, styles.absolute]}
        >
          <Text style={tw`text-white text-2xl font-bold`}>Success!</Text>
          <Text style={tw`text-white text-center`}>
            Your password has been reset. You can now login with your new
            password
          </Text>
          <View style={tw`bg-white p-6 rounded-3xl m-12`}>
            <Ionicons
              name={"checkmark-circle-sharp"}
              size={32}
              color={Colors.light.primary}
            />
          </View>
          <PrimaryButton onPress={backToSignIn} text="Back to Sign In" />
        </BlurView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absolute: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ResetPasswordSuccess;
