import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import CustomInput from "../inputs/CustomInput";

type Props = {};

const Personal = (props: Props) => {
  const [firstName, setFirstName] = useState("");
  return (
    <View>
      <CustomInput
        label="First Name"
        value={firstName}
        placeholder="First name"
        setValue={setFirstName}
      />
    </View>
  );
};

export default Personal;

const styles = StyleSheet.create({});
