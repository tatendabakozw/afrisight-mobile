import { StyleSheet } from "react-native";
import React, { useState } from "react";
import Dropdown from "../inputs/Dropdown";
import CustomInput from "../inputs/CustomInput";
import Heading from "../heading/Heading";

type Props = {};

const Experience = (props: Props) => {
  const [selectedOccupassionStatus, setSelectedOccupationStatus] =
    useState("Select an option");
  const occupation_statuses = ["Employed", "Not Employed"];
  const [occupation_name, setOccupationName] = useState("");
  const [selectedMonthlyIncome, setSelectedMonthlyIncome] =
    useState("Select an option");

  const incomeRanges = ["0-1000", "2000-5000", "6000-10000", "1000 and above"];
  const [education_level, setEducationLevel] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [yearOfGraduation, setYearOfGraduation] = useState("");
  return (
    <>
      <Dropdown
        label="Occupation Status"
        options={occupation_statuses}
        selectedOption={selectedOccupassionStatus}
        onSelect={(option) => setSelectedOccupationStatus(option)}
      />
      <CustomInput
        label="Occupation Name"
        value={occupation_name}
        placeholder="Occupation name"
        setValue={setOccupationName}
      />
      <Dropdown
        label="Monthly Income"
        options={incomeRanges}
        selectedOption={selectedMonthlyIncome}
        onSelect={(option) => setSelectedMonthlyIncome(option)}
      />
      <Heading text="Education" />

      <CustomInput
        label="Education level completed"
        value={education_level}
        placeholder="Education level"
        setValue={setEducationLevel}
      />
      <CustomInput
        label="Field of study"
        value={fieldOfStudy}
        placeholder="Field of study"
        setValue={setFieldOfStudy}
      />
    </>
  );
};

export default Experience;

const styles = StyleSheet.create({});
