import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

interface Props {
  modalVisible: boolean;
  setModalVisible?: any;
}

const EmailSuccessModal = ({ modalVisible, setModalVisible }: Props) => {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={[tw`h-full w-full`, styles.container]}>
        <BlurView
          tint="systemUltraThinMaterialDark"
          intensity={100}
          style={[tw`items-center justify-center gap-4 px-16`, styles.absolute]}
        >
          <Text style={tw`text-white text-2xl font-bold`}>Email Sent!</Text>
          <Text style={tw`text-white`}>
            We have sent a password reset link to your email
          </Text>
          <View style={tw`bg-white p-6 rounded-3xl m-12`}>
            <Ionicons
              name={"checkmark-circle-sharp"}
              size={32}
              color={Colors.light.primary}
            />
          </View>
          {/* <TouchableOpacity
            style={{ backgroundColor: "red", width: 30, height: 30 }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text>X</Text>
          </TouchableOpacity> */}
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

export default EmailSuccessModal;
