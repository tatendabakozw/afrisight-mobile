import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "twrnc";

type Props = {
  placeholder: string;
  label?: string;
  icon?: any;
  onIconPress?: () => void;
  isPassword?: boolean;
  value: any;
  setValue: any;
  missing?: boolean;
};

const CustomInput = (props: Props) => {
  return (
    <View style={tw`flex flex-col gap-1 w-full`}>
      {props.label && (
        <Text style={tw`text-zinc-500 font-semibold pl-1`}>{props.label}</Text>
      )}
      <View
        style={tw`${
          props.missing
            ? " border border-red-800/50 "
            : " border border-zinc-300/50 "
        } p-3 flex flex-row items-center rounded-xl w-full`}
      >
        <TextInput
          secureTextEntry={!props.isPassword}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.setValue}
          style={tw`flex-1`}
        />
        {props.icon && (
          <TouchableOpacity activeOpacity={0.7} onPress={props.onIconPress}>
            {props.icon}
          </TouchableOpacity>
        )}
      </View>
      {props.missing && (
        <Text
          style={tw`text-red-800/50 w-full self-end font-semibold pl-1 text-xs text-right`}
        >
          {props.label} is required
        </Text>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
