import React from 'react';
import { View } from 'react-native';
import { Fonts, Typography } from '@/constants/typography';
import Colors from '@/constants/Colors';
import Text from '../ui/Text';
import TextInput from '../ui/TextInput';

type Props = {
  question: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
};

const Paragraph = ({ question, value, onChange, error, required: optional }: Props) => {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text style={{
        fontFamily: Fonts.Inter_600SemiBold,
        color: Colors.design.highContrastText,
        fontSize: Typography.body,
        marginBottom: 8
      }}>
        {question}
        {optional && <Text style={{ color: Colors.design.mutedText }}> (Optional)</Text>}
      </Text>
      <TextInput
        autoFocus
        style={{
          borderColor: Colors.design.separator,
          backgroundColor: Colors.design.white,
          borderWidth: 1,
          borderRadius: 8,
          padding: 8,
          height: 120,
          textAlignVertical: 'top',
        }}
        multiline={true}
        numberOfLines={4}
        value={value}
        onChangeText={onChange}
      />
      {error && <Text style={{ color: Colors.design.redSurface, marginTop: 4 }}>{error}</Text>}
    </View>
  );
};

export default Paragraph;
