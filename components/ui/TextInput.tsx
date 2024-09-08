import React, { useEffect, useState } from 'react';
import { View, TextInput as RNTextInput, TextInputProps, Animated, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { Fonts, Typography } from '@/constants/typography';

interface CustomTextInputProps extends TextInputProps {
    withEmbeddedLabel?: boolean;
}

const TextInput = (props: CustomTextInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const labelPosition = new Animated.Value(hasValue || isFocused ? 1 : 0);

    const animateLabel = (toValue: number) => {
        Animated.timing(labelPosition, {
            toValue,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleFocus = (e: any) => {
        setIsFocused(true);
        animateLabel(1);
        props.onFocus && props.onFocus(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        if (!hasValue) {
            animateLabel(0);
        }
        props.onBlur && props.onBlur(e);
    };

    const handleChangeText = (text: string) => {
        setHasValue(text.length > 0);
        props.onChangeText && props.onChangeText(text);
    };

    const labelStyle = {
        position: 'absolute' as any,
        left: 12,
        fontFamily: Fonts.Inter_600SemiBold,
        top: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [17, 6],
        }),
        fontSize: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 14],
        }),
        color: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [Colors.design.text, Colors.design.highContrastText],
        }),
    };

    useEffect(() => {
        if (props.value) setHasValue(props.value.length > 0)
    }, [])

    console.log(props.withEmbeddedLabel)

    return (
        <View style={styles.container}>
            {props.withEmbeddedLabel && (
                <Animated.Text style={labelStyle}>
                    {props.placeholder}
                </Animated.Text>
            )}
            <RNTextInput
                {...props}
                style={[
                    styles.input,
                    props.style,
                    isFocused && styles.inputFocused,
                    {
                        fontSize: Typography.paragraph,
                        color: Colors.design.highContrastText,
                        paddingTop: props.withEmbeddedLabel ? 20 : 12,
                        paddingBottom: props.withEmbeddedLabel ? 4 : 12,
                    }
                ]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={handleChangeText}
                placeholder={props.withEmbeddedLabel ? '' : props.placeholder}
                selectionColor={Colors.design.highContrastText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    input: {
        borderRadius: 8,
        height: 64,
        borderColor: Colors.design.highContrastBorder,
        borderWidth: 1,
        borderStyle: "solid",
        paddingHorizontal: 12,
        width: "100%",
        fontFamily: Fonts.Inter_600SemiBold,
    },
    inputFocused: {
        borderColor: Colors.design.highContrastText,
        borderWidth: 2
    },

});

export default TextInput;
