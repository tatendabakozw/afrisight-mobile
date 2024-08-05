import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import tw from "twrnc";
import Feather from "@expo/vector-icons/Feather";

type DropdownProps = {
  options: string[];
  label?: string;
  selectedOption: string;
  onSelect: (option: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onSelect,
  label,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsModalVisible(false);
  };

  return (
    <View>
      <View style={tw`flex flex-col gap-1`}>
        {label && (
          <Text style={tw`text-zinc-500 font-semibold pl-1`}>{label}</Text>
        )}
        <TouchableOpacity
          style={tw` p-3 flex flex-row items-center rounded-xl w-full border border-zinc-300/50`}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={tw`flex-1 text-zinc-400`}>{selectedOption}</Text>
          <Feather name="chevron-down" size={24} color="#71717a" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={tw`text-zinc-500`}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdown: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
  },
});
