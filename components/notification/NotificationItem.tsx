import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { truncateText } from "@/app/utils/text-moderators";
import Colors from "@/constants/Colors";

const NotificationItem = () => {
  const description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ipsum consectetur vero accusantium molestiae dolores illum provident quod voluptatem nam eaque fuga saepe, voluptas culpa qui suscipit totam? Quaerat, quae?`;

  const renderDescription = () => {
    return (
      <Text style={tw`text-zinc-400`}>{truncateText(description, 80)}</Text>
    );
  };

  return (
    <View style={tw`w-full `}>
      <View style={tw`flex flex-row w-full items-center`}>
        <View style={tw`flex flex-1`}>
          <Text style={tw`text-lg text-zinc-950 font-semibold`}>Rolex</Text>
          <View style={tw`mt-1 max-w-3/4`}>{renderDescription()}</View>
        </View>
        <View style={tw`flex items-end`}>
          <View style={tw`bg-[${Colors.light.primary}] h-2 w-2 rounded-full`} />
          <Text style={tw`text-zinc-400 mt-1 text-xs`}>2h ago</Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({});
