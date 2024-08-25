import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import tw from "twrnc";
import Feather from "@expo/vector-icons/Feather";
import { Fonts, Typography } from "@/constants/typography";
import Colors from "@/constants/Colors";
import Text from "../ui/Text";

interface DatePickerProps {
  question: string;
}

const DatePicker: React.FC<DatePickerProps> = (props: DatePickerProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState<boolean>(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text style={{
        fontFamily: Fonts.Inter_600SemiBold,
        color: Colors.design.highContrastText,
        fontSize: Typography.buttonText,
        marginBottom: 8

      }}>{props.question}</Text>
      <TouchableOpacity
        onPress={showDatepicker}
        activeOpacity={0.7}
        style={tw`flex flex-row gap-2 w-full p-2 border border-zinc-300/50 items-center bg-zinc-100 rounded-xl`}
      >
        <Feather name="calendar" size={24} color="black" />
        <Text style={[{
          fontFamily: Fonts.Inter_500Medium,

        }]}>{date.toDateString()}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
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
