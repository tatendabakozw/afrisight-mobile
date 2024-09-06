import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Themed';
import EditScreenInfo from '@/components/EditScreenInfo';

export default function ModalScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modal</Text>
            <View style={styles.separator} />
            <EditScreenInfo path="app/screens/ModalScreen.tsx" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
        backgroundColor: '#eee',
    },
});