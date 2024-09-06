import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationStackProps } from '@/screens';

export default function NotFoundScreen({ navigation }: {
    navigation: NavigationStackProps<"NotFoundScreen">
}) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>This screen doesn't exist.</Text>
            <TouchableOpacity
                style={styles.link}
                onPress={() => navigation.navigate('ExploreScreen')}
            >
                <Text style={styles.linkText}>Go to home screen!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});