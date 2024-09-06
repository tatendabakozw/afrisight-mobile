import Colors from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TicketEdgeCard = ({ children, style }: { children: React.ReactNode, style?: any }) => {
    return (
        <View style={[styles.card, style]}>
            {children}
            <View style={styles.ticketEdge}>
                {[...Array(20)].map((_, index) => (
                    <View key={index} style={styles.ticketNotch} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    ticketEdge: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 4,
        right: 4,
    },
    ticketNotch: {
        width: 10,
        height: 8,
        backgroundColor: Colors.design.interactiveSurface,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
});

export default TicketEdgeCard;