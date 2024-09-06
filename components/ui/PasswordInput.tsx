import { Fonts, Typography } from '@/constants/typography';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Text from './Text';
import Colors from '@/constants/Colors';
import TextInput from './TextInput';

const PasswordInput = (props: {
    value: string;
    onValueChange: (value: string) => void
}) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        props.onValueChange(password)
    }, [password])

    return (
        <View style={styles.container}>
            <TextInput
                withEmbeddedLabel
                style={styles.input}
                secureTextEntry={!showPassword}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'

            />
            <TouchableOpacity onPress={toggleShowPassword} style={styles.showPasswordButton}>
                <Text style={styles.showPasswordText}>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 54,
        borderRadius: 8,
    },
    input: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontFamily: Fonts.Inter_400Regular,
        fontSize: Typography.base,
    },
    showPasswordButton: {
        paddingHorizontal: 10,
        position: "absolute",
        top: 0,
        right: 0,
        height: 54,
        alignItems: "center",
        justifyContent: "center"

    },
    showPasswordText: {
        color: Colors.design.highContrastText,
        fontFamily: Fonts.Inter_600SemiBold,
        fontSize: 13
    },
});

export default PasswordInput;
