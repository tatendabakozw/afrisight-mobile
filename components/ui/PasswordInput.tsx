import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

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
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    showPasswordButton: {
        paddingHorizontal: 10,
    },
    showPasswordText: {
        fontSize: 14,
        color: '#121212',
        fontWeight: "700"
    },
});

export default PasswordInput;
