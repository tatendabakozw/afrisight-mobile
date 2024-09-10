import React from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import Feather from "@expo/vector-icons/Feather";
import { Fonts, Typography } from "@/constants/typography";
import Colors from "@/constants/Colors";
import Text from "../ui/Text";
import { StyleSheet } from "react-native";

interface DatePickerProps {
  question: string;
  value: Date;
  onChange: (value: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ question, value, onChange }) => {
  const [show, setShow] = React.useState<boolean>(false);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || value;
    setShow(Platform.OS === "ios");
    onChange(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text style={{
        fontFamily: Fonts.Inter_600SemiBold,
        color: Colors.design.highContrastText,
        fontSize: Typography.body,
        marginBottom: 8
      }}>{question}</Text>
      <TouchableOpacity
        onPress={showDatepicker}
        activeOpacity={0.7}
        style={{
          flexDirection: "row",
          gap: 8,
          padding: 8,
          borderWidth: 1,
          borderColor: Colors.design.separator,
          alignItems: "center",
          backgroundColor: Colors.design.white,
          borderRadius: 8,
        }}
      >
        <Feather name="calendar" size={24} color={Colors.design.text} />
        <Text style={{
          fontFamily: Fonts.Inter_500Medium,
          color: Colors.design.highContrastText,
        }}>{value.toDateString()}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker

          testID="dateTimePicker"
          value={value}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dateText: {
    fontSize: 18,
    marginVertical: 10,
  },
});
