import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Import your modal screens here

const Stack = createStackNavigator();

function ModalNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Add your modal screens here */}
        </Stack.Navigator>
    );
}

export default ModalNavigator;