import { Fonts, Typography } from '@/constants/typography';
import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Text from './Text';
import Colors from '@/constants/Colors';

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
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        height: 54,
        borderRadius: 8,
        borderColor: "#d0d0d0",
        borderWidth: 1,
        borderStyle: "solid",
        padding: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontFamily: Fonts.Inter_400Regular,
        fontSize: Typography.paragraph
    },
    showPasswordButton: {
        paddingHorizontal: 10,
    },
    showPasswordText: {
        color: Colors.design.highContrastText,
        fontFamily: Fonts.Inter_600SemiBold,
        fontSize: 13
    },
});

export default PasswordInput;
