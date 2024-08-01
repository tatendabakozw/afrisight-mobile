import React from "react";
import { Modal, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import PrimaryButton from "../buttons/PrimaryButton";
import { useNavigation } from "expo-router";

interface Props {
  modalVisible: boolean;
  setModalVisible?: any;
}

const DeleteModal = ({ modalVisible, setModalVisible }: Props) => {
  const cancelAction = () => {
    setModalVisible(false);
  };
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={[tw`h-full w-full`, styles.container]}>
        <BlurView
          tint="systemUltraThinMaterialDark"
          intensity={100}
          style={[tw`items-center justify-center gap-4 px-8`, styles.absolute]}
        >
          <View style={tw`bg-white p-8 flex-col gap-4 rounded-3xl`}>
            <Text style={tw`text-zinc-950 font-bold text-lg text-center`}>
              Delete Number
            </Text>
            <Text style={tw`text-zinc-400 text-center`}>
              Are you sure you want tp delete this number
            </Text>
            <View
              style={tw`flex flex-row w-full items-end gap-2 justify-between`}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={cancelAction}
                style={tw`border border-zinc-200/50 flex-1 py-3 rounded-xl`}
              >
                <Text style={tw`text-zinc-500 text-center px-4`}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={tw`bg-red-500 flex-1 py-3 rounded-xl`}
              >
                <Text style={tw`text-white text-center px-4`}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
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

export default DeleteModal;
