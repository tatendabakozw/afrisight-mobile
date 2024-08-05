import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Colors from "@/constants/Colors";

type Props = {};

const Hobbies = (props: Props) => {
  const [selectedHobbies, setSelectedHobbies] = useState<any[]>([]);
  const hobbies = [
    { name: "Reading", _id: "reading" },
    { name: "Traveling", _id: "traveling" },
    { name: "Cooking", _id: "cooking" },
    { name: "Gaming", _id: "gaming" },
    { name: "Hiking", _id: "hiking" },
    { name: "Swimming", _id: "swimming" },
    { name: "Painting", _id: "painting" },
    { name: "Music", _id: "music" },
    { name: "Photography", _id: "photography" },
  ];

  const toggleHobbySelection = (hobbyId: string) => {
    setSelectedHobbies((prevSelectedHobbies) =>
      prevSelectedHobbies.includes(hobbyId)
        ? prevSelectedHobbies.filter((id) => id !== hobbyId)
        : [...prevSelectedHobbies, hobbyId]
    );
  };

  return (
    <View style={tw`flex flex-row flex-wrap gap-6`}>
      {hobbies.map((item) => (
        <TouchableOpacity
          onPress={() => toggleHobbySelection(item._id)}
          activeOpacity={0.7}
          style={tw`${
            selectedHobbies.includes(item._id)
              ? `bg-[${Colors.light.primary}]`
              : "bg-zinc-200"
          } py-2 px-4 rounded-full`}
          key={item._id}
        >
          <Text style={tw`text-zinc-700`}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Hobbies;

const styles = StyleSheet.create({});
