import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

function SplashScreen() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={Colors.design.accent} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.design.white,
    },
});

export default SplashScreen;