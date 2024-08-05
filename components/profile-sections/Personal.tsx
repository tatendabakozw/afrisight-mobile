import { StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomInput from "../inputs/CustomInput";
import Dropdown from "../inputs/Dropdown";

type Props = {};

const Personal = (props: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [weight, setWeight] = useState("");
  const [selelctedChildren, setSelectedChildren] = useState("Select an option");
  const [selectedSmoking, setSelectedSmoking] = useState("Select an option");

  const children = ["No children", "Less than 5", "More than 5"];
  const smoking = ["I dont smoke", "Occassional smoking", "Frequent Smoking"];
  return (
    <>
      <CustomInput
        label="First Name"
        value={firstName}
        placeholder="First name"
        setValue={setFirstName}
      />
      <CustomInput
        label="Last Name"
        value={lastName}
        placeholder="Last name"
        setValue={setLastName}
      />
      <CustomInput
        label="Email"
        value={email}
        placeholder="Email"
        setValue={setEmail}
      />
      <Dropdown
        label="Do you have children?"
        options={children}
        selectedOption={selelctedChildren}
        onSelect={(option) => setSelectedChildren(option)}
      />
      <Dropdown
        label="Do you smoke?"
        options={smoking}
        selectedOption={selectedSmoking}
        onSelect={(option) => setSelectedSmoking(option)}
      />
      <CustomInput
        label="Weight"
        value={weight}
        placeholder="Weight in KG"
        setValue={setWeight}
      />
    </>
  );
};

export default Personal;

const styles = StyleSheet.create({});
